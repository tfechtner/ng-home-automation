import { State, Action, StateContext, Selector } from '@ngxs/store';
import { RoomsActions } from './rooms.actions';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NestJsService } from '../../../services/nestJs/nestJs.service';
import { GetRoomsDto } from '../../../services/nestJs/dto/getRooms.dto';
import { isNullOrUndefined } from '../../../utils/functions';
import { Room } from '../../../models/room';

export interface IRoomsStateModel {
    rooms: Room[];
}

export const defaults: IRoomsStateModel = {
    rooms: []
};

@State<IRoomsStateModel>({
    name: 'Rooms',
    defaults
})
export class RoomsState {

    @Selector()
    public static Rooms(state: IRoomsStateModel) {
        return state.rooms;
    }

    constructor(
        private _nestJsService: NestJsService
    ) {}

    @Action(RoomsActions.GetsRoomsAction)
    getRooms(
        { setState }: StateContext<IRoomsStateModel>
    ) {
        return this._nestJsService.getRooms().pipe(
            take(1),
            tap(  (roomsDto: GetRoomsDto) => {
                if (!isNullOrUndefined(roomsDto)) {
                    const newRooms = [];
                    roomsDto.forEach(room => {
                        newRooms.push(new Room(room));
                    });
                    setState({ rooms: newRooms});
                }
            }),
            catchError((error) => {
                // Add loading error state
                return of('Error on RoomsActions.GetsRoomsAction = ' + error);
            })
        );
    }
}
