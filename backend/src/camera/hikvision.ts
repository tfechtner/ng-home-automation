import { Logger } from '@nestjs/common';
import * as events from 'events';
import { Socket } from 'net';
import * as net from 'net';
import * as request from 'request';
import * as util from 'util';
import * as	xml2js from 'xml2js';

// Interfaces
export interface IOptions {
    host: string;
    port: string;
    user: string;
    pass: string;
    log: boolean;
}

export class Hikvision extends events.EventEmitter {

    public client: Socket;

    private TRACE = false;
    private BASEURI: string = '';
    private parser = new xml2js.Parser();
    private activeEvents = { };
    private triggerActive = false;

    constructor(
        options: IOptions,
        private _logger: Logger
    ) {
        super();

        if (options.log) {
            this.TRACE = options.log;
        }

        this.client = this.connect(options);
        this.BASEURI = 'http://' + options.host + ':' + options.port;
    }

    public connect(options): Socket {
        const authHeader = 'Authorization: Basic ' + new Buffer(options.user + ':' + options.pass).toString('base64');

        return net.connect(options, () => {
            const header = 'GET /ISAPI/Event/notification/alertStream HTTP/1.1\r\n' +
                'Host: ' + options.host + ':' + options.port + '\r\n' +
                authHeader + '\r\n' +
                'Accept: multipart/x-mixed-replace\r\n\r\n';

            this.client.write(header);
            this.client.setKeepAlive(true, 1000);

            this._handleConnection(options);
            this._initOnClose(options);
            this._initOnError();
        });
    }

    public initOnData() {
        const that = this;
        this.client.on('data', (data) => {
            this.parser.parseString(data, function(err, result) {
                if (result) {
                    let code = result['EventNotificationAlert']['eventType'][0];
                    let action = result['EventNotificationAlert']['eventState'][0];
                    const index = parseInt(result['EventNotificationAlert']['channelID'][0], 10);
                    const count = parseInt(result['EventNotificationAlert']['activePostCount'][0], 10);

                    // give codes returned by camera prettier and standardized description
                    if (code === 'IO') { code = 'AlarmLocal'; }
                    if (code === 'VMD') { code = 'VideoMotion'; }
                    if (code === 'linedetection') { code = 'LineDetection'; }
                    if (code === 'videoloss') { code = 'VideoLoss'; }
                    if (code === 'shelteralarm') { code = 'VideoBlind'; }
                    if (action === 'active') { action = 'Start'; }
                    if (action === 'inactive') { action = 'Stop'; }

                    // create and event identifier for each recieved event
                    // This allows multiple detection types with multiple indexes for DVR or multihead devices
                    const eventIdentifier = code + index;

                    // Count 0 seems to indicate everything is fine and nothing is wrong, used as a heartbeat
                    // if triggerActive is true, lets step through the activeEvents
                    // If activeEvents has something, lets end those events and clear activeEvents and reset triggerActive
                    if (count === 0) {
                        if (that.triggerActive === true) {
                            for (const event in that.activeEvents) {
                                if (that.activeEvents.hasOwnProperty(event)) {
                                    const eventDetails = that.activeEvents[event];
                                    if (that.TRACE) {
                                        this._logger.log('Ending Event: ' + event + ' - ' + eventDetails['code'] + ' - ' + ((Date.now() - eventDetails['Systimestamp']) / 1000));
                                    }
                                    this.emit('alarm', eventDetails['code'], 'Stop', eventDetails['index']);
                                }
                            }
                            that.activeEvents = {};
                            that.triggerActive = false;

                        } else {
                            // should be the most common result
                            // Nothing interesting happening and we haven't seen any events
                            if (that.TRACE) { this.emit('alarm', code, action, index); }
                        }
                    } else if (typeof that.activeEvents[eventIdentifier] === 'undefined' || that.activeEvents[eventIdentifier] == null) {
                        // if the first instance of an eventIdentifier, lets emit it,
                        // add to activeEvents and set triggerActive
                        const eventDetails = { };
                        eventDetails['code'] = code;
                        eventDetails['index'] = index;
                        eventDetails['lasttimestamp'] = Date.now();

                        that.activeEvents[eventIdentifier] = eventDetails;
                        that.emit('alarm', code, action, index);
                        that.triggerActive = true;

                        // known active events
                    } else {
                        if (that.TRACE) { this._logger.log('    Skipped Event: ' + code + ' ' + action + ' ' + index + ' ' + count ); }

                        // Update lasttimestamp
                        const eventDets = { };
                        eventDets['code'] = code;
                        eventDets['index'] = index;
                        eventDets['lasttimestamp'] = Date.now();
                        that.activeEvents[eventIdentifier] = eventDets;

                        // step through activeEvents
                        // if we haven't seen it in more than 2 seconds, lets end it and remove from activeEvents
                        for (const event in that.activeEvents) {
                            if (that.activeEvents.hasOwnProperty(event)) {
                                const eventDetails = that.activeEvents[event];
                                if (((Date.now() - eventDetails['lasttimestamp']) / 1000) > 2) {
                                    if (that.TRACE) {
                                        this._logger.log('    Ending Event: ' + event + ' - ' + eventDetails['code'] + ' - ' + ((Date.now() - eventDetails['lasttimestamp']) / 1000));
                                    }
                                    that.emit('alarm', eventDetails['code'], 'Stop', eventDetails['index']);
                                    delete that.activeEvents[event];
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    // Request PTZ Status
    public ptzStatus() {
        request(this.BASEURI + '/cgi-bin/ptz.cgi?action=getStatus', (error, response, body) => {
            if ((!error) && (response.statusCode === 200)) {
                body = body.toString().split('\r\n').trim();
                if (this.TRACE) { this._logger.log('PTZ STATUS: ' + body); }
                this.emit('ptzStatus', body);
            } else {
                this.emit('error', 'FAILED TO QUERY STATUS');
                if (this.TRACE) { this._logger.log('FAILED TO QUERY STATUS'); }
            }
        });
    }

    private _initOnClose(options: IOptions) {
        this.client.on('close', () => { // Try to reconnect after 30s
            setTimeout(() => {
                this.connect(options);
            }, 30000);
            this._handleEnd();
        });
    }

    private _initOnError() {
        this.client.on('error', (err) => {
            this._handleError(err);
        });
    }

    private _handleConnection(options) {
        if (this.TRACE)	{
            this._logger.log('Connected to ' + options.host + ':' + options.port);
        }
        this.emit('connect');
    }

    private _handleEnd() {
        if (this.TRACE)	{
            this._logger.log('Connection closed!');
        }
        this.emit('end');
    }

    private _handleError(err) {
        if (this.TRACE) {
            this._logger.log('Connection error: ' + err);
        }
        this.emit('error', err);
    }
}
