import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DEVICE_KEYS } from '../config/main';
import { DevicesService } from './devices.service';
import { DeviceTypes } from './models/device';

@Controller('devices')
export class DevicesController {

    constructor(
        private _devicesService: DevicesService
    ) {}

    @Get()
    getDevices() {
        return this._devicesService.getDevices();
    }

    @Get(':key')
    getDevice(@Param('key') key: DEVICE_KEYS): Observable<DeviceTypes> {
        return this._devicesService.getDevice(key);
    }

}
