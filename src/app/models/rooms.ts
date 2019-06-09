import { Room } from './room';

export class Rooms {
    private rooms: Array<Room> = [];

    constructor(initObject: Array<object>) {
        for (const roomObj in initObject.keys()) {
            if (initObject.hasOwnProperty(roomObj)) {
                this.rooms.push(new Room(initObject[roomObj]));
            }
        }
    }

    getRooms() {
        return this.rooms;
    }

    getRoomById(id: string): Room {
        for (const room of this.rooms) {
            if (room.getId() === id) {
                return room;
            }
        }
        return null;
    }
}
