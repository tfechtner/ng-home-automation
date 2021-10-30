import { DeviceTypes, IDeviceBaseDto } from '@backend/devices/models/device';

export class Device implements IDeviceBaseDto<any> {
    public key;
    public type;
    public name;
    public room;
    public roomName: string;

    constructor(device: DeviceTypes) {
        Object.assign(this, {
            ...device
        });
    }
}
