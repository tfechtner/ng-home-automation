import { Injectable } from '@nestjs/common';
import { CONFIG } from '../config/main';
import { IRoom, Room } from './models/room/room';

export const roomsDefaults: IRoom[] = [];

@Injectable()
export class RoomsService {
    rooms: IRoom[];

    constructor() {
        const initRooms: IRoom[] = CONFIG.ROOMS;
        this.rooms = roomsDefaults;
        initRooms.forEach(room => {
            this.rooms.push(new Room(room));
        });
    }

    getRoom(id: number): Room {
        return this.rooms.find(room => room.id === id);
    }
}
