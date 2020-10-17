import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { RoomsActions } from './rooms.actions';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NestService } from '@services/nest/nest.service';
import { GetRoomsDto } from '@services/nest/dto/rooms.dto';
import { isNullOrUndefined } from '@utils/functions';
import { Room } from '@models/room';

export class IRoomsStateModel extends Array<Room> {}

export const defaults: Room[] = [];

@State<Room[]>({
    name: 'Rooms',
    defaults
})
@Injectable()
export class RoomsState {

    @Selector()
    public static room(roomId: number) {
        return createSelector([ RoomsState ], (state: IRoomsStateModel) => {
            return state['Rooms'].find( room => room.id === roomId);
        });
    }

    constructor(
        private _nestService: NestService
    ) {}

    @Action(RoomsActions.GetsRoomsAction)
    getRooms(
        { setState }: StateContext<IRoomsStateModel>
    ) {
        return this._nestService.getRooms().pipe(
            take(1),
            tap(  (roomsDto: GetRoomsDto) => {
                if (!isNullOrUndefined(roomsDto)) {
                    const newRooms = [];
                    roomsDto.forEach(room => {
                        newRooms.push(new Room(room));
                    });
                    setState(newRooms);
                }
            }),
            catchError((error) => {
                // Add loading error state
                return of('Error on RoomsActions.GetsRoomsAction = ' + error);
            })
        );
    }
}
