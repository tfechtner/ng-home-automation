import { Injectable } from '@nestjs/common';
import { CONFIG } from '../config/main';
import { Device, IDevice } from './models/device';

export const devicesDefaults = new Map<string, IDevice>();

@Injectable()
export class DevicesService {
    private _devices: Map<string, IDevice>;

    constructor() {
        const initDevices = CONFIG.DEVICES_MAP;
        this._devices = devicesDefaults;

        initDevices.forEach((device, id) => {
            this._devices.set(id, new Device(device));
        });
    }

    getDevices(): IDevice[] {
        return Array.from(this._devices.values());
    }

    getDevice(id: string): Device {
        return this._devices.get(id);
    }
}
