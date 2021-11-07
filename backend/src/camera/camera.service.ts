import { HttpService, Injectable, Logger } from '@nestjs/common';
import { DEVICE_KEYS } from '../config/main';
import { NestConfigService } from '../services/nest-config.service';
import { cameraDtoDefaults, ICameraDto } from './dto/cameraDevice.interface';
import { Hikvision } from './hikvision';

@Injectable()
export class CameraService {

    private _frontCamera: Hikvision;
    private _hallCamera: Hikvision;
    private _patioCamera: Hikvision;

    constructor(
        private httpService: HttpService,
        private _nestConfigService: NestConfigService,
        private _logger: Logger
    ) {
        this._logger = new Logger('CameraService');
    }

    public init() {

        this._frontCamera = new Hikvision({
            host: '192.168.0.182',
            port: '80',
            user: 'admin',
            pass: 'mwB@WG.iXjyQu4',
            log: true
        }, this._logger);

        this._hallCamera = new Hikvision({
            host: '192.168.0.181',
            port: '80',
            user: 'admin',
            pass: '2bH2v9iGq6Ne',
            log: true
        }, this._logger);

        this._patioCamera = new Hikvision({
            host: '192.168.0.180',
            port: '80',
            user: 'admin',
            pass: 'Bxk9@NmgaEj!',
            log: true
        }, this._logger);

        this._logger.log(`${!!this._hallCamera ? 'Connected' : 'Not Connected'}`);

        this._initHealthCheck();
        this._initCameraAlarms();
    }

    public getDevice(key: DEVICE_KEYS): ICameraDto {
        switch (key) {
            case DEVICE_KEYS.FRONT_CAMERA:
                return this._mapCamera(this._frontCamera);
            case DEVICE_KEYS.HALL_CAMERA:
                return this._mapCamera(this._hallCamera);
            case DEVICE_KEYS.PATIO_CAMERA:
                return this._mapCamera(this._patioCamera);
            default:
                return null;
        }
    }

    private _initHealthCheck() {
        this._logger.log('Health Check xxx');
        // this._hallCamera.ptzStatus();
    }

    private _initCameraAlarms() {
        // Alarm
        this._frontCamera.on('alarm', (code, action, index) => {
            this._onAlarm(code, action, index);
        });
        this._hallCamera.on('alarm', (code, action, index) => {
            this._onAlarm(code, action, index);
        });
        this._patioCamera.on('alarm', (code, action, index) => {
            this._onAlarm(code, action, index);
        });

        // Error
        this._frontCamera.on('error', (code, action, index) => {
            this._onAlarm(code, action, index);
        });
        this._hallCamera.on('error', (code, action, index) => {
            this._onAlarm(code, action, index);
        });
        this._patioCamera.on('error', (code, action, index) => {
            this._onAlarm(code, action, index);
        });
    }

    private _onAlarm(code, action, index) {
        this._logger.log(code + ' ' + action + ' ' + index);
        // if (code === 'VideoMotion'   && action === 'Start') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Motion Detected'); }
        // if (code === 'VideoMotion'   && action === 'Stop') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Motion Ended'); }
        // if (code === 'LineDetection' && action === 'Start') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Line Cross Detected'); }
        // if (code === 'LineDetection' && action === 'Stop') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Line Cross Ended'); }
        // if (code === 'AlarmLocal'    && action === 'Start') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Local Alarm Triggered: ' + index); }
        // if (code === 'AlarmLocal'    && action === 'Stop') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Local Alarm Ended: ' + index); }
        // if (code === 'VideoLoss'     && action === 'Start') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Lost!'); }
        // if (code === 'VideoLoss'     && action === 'Stop') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Found!'); }
        // if (code === 'VideoBlind'    && action === 'Start') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Blind!'); }
        // if (code === 'VideoBlind'    && action === 'Stop') { this._logger.log(' ' + this._getDateTime() + ' Channel ' + index + ': Video Unblind!'); }
    }

    private _getDateTime() {
        const date = new Date();
        let hour: number | string = date.getHours();
        hour = (hour < 10 ? '0' : '') + hour;
        let min: number | string  = date.getMinutes();
        min = (min < 10 ? '0' : '') + min;
        let sec: number | string  = date.getSeconds();
        sec = (sec < 10 ? '0' : '') + sec;
        const year = date.getFullYear();
        let month: number | string = date.getMonth() + 1;
        month = (month < 10 ? '0' : '') + month;
        let day: number | string = date.getDate();
        day = (day < 10 ? '0' : '') + day;
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    }

    private _mapCamera(camera: Hikvision): ICameraDto {
        return {
            ...cameraDtoDefaults,
            localAddress: camera.options.host,
            remoteAddress: camera.client.remoteAddress
        };
    }
}
