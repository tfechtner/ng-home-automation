import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Room } from '../../models/room';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    public room$: Room;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            const roomId = parseInt(params.roomId, 10);
            this.store.select(RoomsState.room(roomId)).subscribe(
                room => {
                    this.room$ = room;
                }
            );
        });
    }

    ngOnInit() {

    }
}
