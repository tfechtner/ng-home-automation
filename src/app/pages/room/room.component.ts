import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { PageService } from '../../services/page/page.service';
import { Select, Store } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Room } from '../../models/room';
import { filter, find, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    @Select(RoomsState)
    public room$: Observable<RoomsState>;

    public room: Room;

    private _roomId: number;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private pageService: PageService
    ) {
        this.route.params.subscribe(params => {
            console.log(params);
            this._roomId = params.roomId.toString();
        });

        // this.pageService.setPageTitle(room.getName());
    }

    ngOnInit() {
        console.log('RoomComponent.ngOnInit');
        this.room$
            .pipe(
                // filter(room => room.id === this._roomId)
            )
            .subscribe(rooms => {
                console.log(rooms);
            });
    }

}
