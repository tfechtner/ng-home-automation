import { Room } from './room';
import { GetRoomDto, GetRoomsDto } from '../services/nestJs/dto/getRooms.dto';
import { isNullOrUndefined } from '../utils/functions';

export class Rooms {

    private _rooms: Map<number, Room>;

    constructor(initObject?) {
        this._rooms = new Map<number, Room>();

        const getRoomsDto = initObject as GetRoomsDto;
        if (!isNullOrUndefined(initObject)) {
            console.log('here');
            const map = new Map(initObject);
            console.log(map);
            Array.from(map.values()).forEach((room: GetRoomDto) => {
                console.log(room._id);
                console.log(new Room(room));
                this._rooms.set(room._id, new Room(room));
            });
        }
    }

    get rooms(): Map<number, Room> {
        return this._rooms;
    }

    set rooms(value: Map<number, Room>) {
        this._rooms = value;
    }
}
