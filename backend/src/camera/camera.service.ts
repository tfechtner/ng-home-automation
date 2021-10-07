import { HttpService, Injectable, Logger } from '@nestjs/common';
import { NestConfigService } from '../services/nest-config.service';
import { Hikvision } from './hikvision';

@Injectable()
export class CameraService {

    private _hallCamera: Hikvision;

    constructor(
        private httpService: HttpService,
        private _nestConfigService: NestConfigService,
        private _logger: Logger
    ) {
        this._hallCamera = new Hikvision({
            host	: '192.168.0.181',
            port 	: '80',
            user 	: 'admin',
            pass 	: '2bH2v9iGq6Ne',
            log 	: false
        });

        this._logger.log(`[ CameraService ] ${!!this._hallCamera ? 'Connected' : 'Not Connected'}`);

        // this._initHealthCheck();
        this._initCameraAlarms();
    }

    private _initHealthCheck() {
        this._logger.log('[ CameraService ] Health Check' + this._hallCamera.ptzStatus());
    }

    private _initCameraAlarms() {
        this._hallCamera.on('alarm', (code, action, index) =>  {
            this._logger.log('[ CameraService ] ' + code + ' ' + action + ' ' + index);
            // if (code === 'VideoMotion'   && action === 'Start') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Motion Detected'); }
            // if (code === 'VideoMotion'   && action === 'Stop') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Motion Ended'); }
            // if (code === 'LineDetection' && action === 'Start') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Line Cross Detected'); }
            // if (code === 'LineDetection' && action === 'Stop') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Line Cross Ended'); }
            // if (code === 'AlarmLocal'    && action === 'Start') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Local Alarm Triggered: ' + index); }
            // if (code === 'AlarmLocal'    && action === 'Stop') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Local Alarm Ended: ' + index); }
            // if (code === 'VideoLoss'     && action === 'Start') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Lost!'); }
            // if (code === 'VideoLoss'     && action === 'Stop') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Found!'); }
            // if (code === 'VideoBlind'    && action === 'Start') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Blind!'); }
            // if (code === 'VideoBlind'    && action === 'Stop') { this._logger.log(' [ CameraService ] ' + this._getDateTime() + ' Channel ' + index + ': Video Unblind!'); }
        });
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
}
