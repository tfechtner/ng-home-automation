import { Room } from './room';
import { GetFibaroRoomsDto } from '@services/nest/dto/rooms.dto';
import { isNullOrUndefined } from '@utils/functions';

export class Rooms {

    rooms: Room[];

    constructor(initObject?: GetFibaroRoomsDto) {
        this.rooms = [];

        if (!isNullOrUndefined(initObject)) {
            initObject.forEach(room => {
                this.rooms.push(new Room(room));
            });
        }
    }
}
