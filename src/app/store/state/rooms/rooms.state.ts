import { State, Action, StateContext } from '@ngxs/store';
import { RoomsActions } from './rooms.actions';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NestJsService } from '../../../services/nestJs/nestJs.service';
import { GetRoomsDto } from '../../../services/nestJs/dto/getRooms.dto';
import { isNullOrUndefined } from '../../../utils/functions';
import { Rooms } from '../../../models/rooms';

export interface IRoomsStateModel {
    rooms: Rooms;
}

export const defaults: IRoomsStateModel = {
    rooms: new Rooms()
};

@State<IRoomsStateModel>({
    name: 'Rooms',
    defaults
})
export class RoomsState {

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
                    setState({ rooms: new Rooms(roomsDto)});
                }
            }),
            catchError((error) => {
                // Add loading error state
                return of('Error on RoomsActions.GetsRoomsAction = ' + error);
            })
        );
    }
}
