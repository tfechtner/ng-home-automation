import { DEVICE_TYPES_ENUM, ROOMS_ENUM } from '../../config/main';
import { isNullOrUndefined } from '../../utils/functions';

export interface IDevice {
    type: DEVICE_TYPES_ENUM;
    name: string;
    room: ROOMS_ENUM;
    fibaroId: number;
}

export const deviceDefaults: IDevice = {
    type: null,
    name: null,
    room: null,
    fibaroId: null
};

export class Device implements IDevice {
    type;
    name;
    room;
    fibaroId;

    constructor(initRoom?: IDevice) {
        Object.assign(this, deviceDefaults);

        if (!isNullOrUndefined(initRoom)) {
            Object.assign(this, initRoom);
        }
    }
}
