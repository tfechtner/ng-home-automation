import { Room } from './room';

export class Rooms {
    private rooms: Array<Room> = [];

    constructor(initObject: Array<object>) {
        for (const roomObj of initObject) {
            this.rooms.push(new Room(roomObj));
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
