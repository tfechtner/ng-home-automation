import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Location, RingApi } from 'ring-client-api';
import { RingCamera } from 'ring-client-api/lib/api/ring-camera';
import { ActiveDing } from 'ring-client-api/lib/api/ring-types';

import { NestConfigService } from '../services/nest-config.service';

@Injectable()
export class RingService {

    private _ringApi: RingApi;
    private _ringLocation: Location;
    private _ringCamera: RingCamera;

    constructor(
        private httpService: HttpService,
        private _nestConfigService: NestConfigService,
        private _logger: Logger
    ) {
        this._logger = new Logger('RingService');
    }

    public init() {
        this._ringApi = new RingApi({
            refreshToken: this._nestConfigService.ringRefreshToken,
            cameraDingsPollingSeconds: 5,
            debug: true
        });

        this._ringApi.getLocations().then((locations) => {
            this._ringLocation = locations[0];
            this._logger.log(`${locations.length} locations found`);
            this._initLocationConnected();
        });

        this._ringApi.getCameras().then((cameras) => {
            this._ringCamera = cameras[0];
            this._logger.log(`${cameras.length} cameras found`);
            this._initCameraEvents();
        });
    }

    private _initLocationConnected() {
        // this._ringLocation.createConnection().then(
        //     (res) => this._logger.log(res.connected),
        //     (err) => this._logger.log(err)
        // );
        // this._ringLocation.getCameraEvents().then(
        //     (res) => this._logger.log(res.events),
        //     (err) => this._logger.log(err)
        // );

        this._ringLocation.onConnected.subscribe((connected) => {
            const state = connected ? 'Connected' : 'Connecting';
            this._logger.log(`${state} to location ${this._ringLocation.name}`);
        });
    }

    private _initCameraEvents() {
        this._ringCamera.getHealth().then((health) => {
            this._logger.log(`Camera Health: ${health.battery_percentage}`);
        });

        this._ringCamera.subscribeToDingEvents().then((sub) => {
            this._logger.log(`Subscribed Ding`);
        });

        this._ringCamera.subscribeToMotionEvents().then((sub) => {
            this._logger.log(`Subscribed Motion`);
        });

        this._ringCamera.onNewDing.subscribe((ding: ActiveDing) => {
            this._logger.log(`Ding Detected: ${ding.kind}`);
        });
        this._ringCamera.onMotionDetected.subscribe((motionDetected: boolean) => {
            if (motionDetected) {
                this._logger.log(`Motion Detected: ${motionDetected}`);
            }
        });
        this._ringCamera.onMotionStarted.subscribe(() => {
            this._logger.log(`[ RingService] Motion Started`);
        });
        this._ringCamera.onDoorbellPressed.subscribe((ding: ActiveDing) => {
            this._logger.log(`[ RingService] Doorbell Pressed: ${ding.kind}`);
        });
    }
}
