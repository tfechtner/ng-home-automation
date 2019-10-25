import { isNullOrUndefined } from '../../../utils/functions';

export interface IRoom {
    id: number;
    name: string;
    urlName: string;
    sonosKey: string;
}

export const roomDefaults: IRoom = {
    id: null,
    name: null,
    urlName: null,
    sonosKey: null
};

export class Room implements IRoom {
    id: number;
    name: string;
    urlName: string;
    sonosKey: string;

    constructor(initRoom?: IRoom) {
        Object.assign(this, roomDefaults);
        if (!isNullOrUndefined(initRoom)) {
            Object.assign(this, initRoom);
        }
    }
}
