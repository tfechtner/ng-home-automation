import { Controller, Get, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device } from './models/device';

@Controller('devices')
export class DevicesController {

    constructor(
        private _devicesService: DevicesService
    ) {}

    @Get()
    getDevices() {
        return this._devicesService.getDevices();
    }

    @Get(':id')
    getDevice(@Param('id') id: string): Device {
        return this._devicesService.getDevice(id);
    }
}
