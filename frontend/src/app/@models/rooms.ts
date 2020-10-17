import { Room } from './room';
import { GetRoomsDto } from '@services/nest/dto/rooms.dto';
import { isNullOrUndefined } from '@utils/functions';

export class Rooms {

    rooms: Room[];

    constructor(initObject?: GetRoomsDto) {
        this.rooms = [];

        if (!isNullOrUndefined(initObject)) {
            initObject.forEach(room => {
                this.rooms.push(new Room(room));
            });
        }
    }
}
