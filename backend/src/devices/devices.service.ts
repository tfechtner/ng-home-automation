import { Injectable } from '@nestjs/common';
import { forkJoin, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG, DEVICE_KEYS, DEVICE_TYPE_NAMES, ROOM_NAMES } from '../config/main';
import { FibaroService } from '../fibaro/fibaro.service';
import { RingService } from '../ring/ring.service';
import { SonosService } from '../sonos/sonos.service';
import { DeviceTypes } from './models/device';

export const devicesDefaults = new Map<string, DeviceTypes>();

@Injectable()
export class DevicesService {
    private _devices: Map<string, DeviceTypes>;

    constructor(
        private _fibaroService: FibaroService,
        private _ringService: RingService,
        private _sonosService: SonosService
    ) {
        this._devices = devicesDefaults;

        CONFIG.DEVICES_MAP.forEach((device, key) => {
            this._devices.set(key, device);
        });
    }

    getDevices(): Observable<DeviceTypes[]> {
        const keys = Array.from(this._devices.keys());
        const requests = keys.map((key: DEVICE_KEYS) => {
            return this.getDevice(key);
        });
        return forkJoin(requests);
    }

    getDevice(key: DEVICE_KEYS): Observable<DeviceTypes> {
        let device: DeviceTypes = this._devices.get(key);

        device = {
            ...device,
            key,
            roomName: ROOM_NAMES[device.room],
            typeName: DEVICE_TYPE_NAMES[device.type]
        };

        if (!!device.fibaroId) {
            return this._fibaroService.getDevice(device.fibaroId).pipe(
                map(fibaroDevice => ({
                    ...device,
                    device: fibaroDevice,
                    battery: device.hasOwnProperty('battery') ? fibaroDevice.properties.batteryLevel : undefined
                }))
            );
        } else if (!!device.sonosRoomName) {
            return this._sonosService.getRoomState(device.sonosRoomName).pipe(
                map(sonosDevice => ({
                    ...device,
                    device: sonosDevice
                }))
            );
        } else if (!!device.ringId) {
            return this._ringService.getDeviceHealth().pipe(
                map(ringHealth => ({
                    ...device,
                    device: ringHealth,
                    battery: ringHealth.battery
                }))
            );
        } else {
            return of(device);
        }
    }
}
