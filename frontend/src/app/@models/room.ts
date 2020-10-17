import { GetRoomDto } from '@services/nest/dto/room.dto';

export interface IRoom {
    id: number;
    name: string;
    urlName: string;
    sonosKey: string;
    icon: string;
}

export const roomDefaults: IRoom = {
    id: null,
    name: null,
    urlName: null,
    sonosKey: null,
    icon: null
};

export class Room implements IRoom {
    id: number;
    name: string;
    urlName: string;
    sonosKey: string;
    icon: string;

    constructor(initObject?: GetRoomDto) {
        Object.assign(this, roomDefaults, initObject);
    }
}
