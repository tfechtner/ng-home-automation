import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PageService } from '../../services/page/page.service';
import { Select, Store } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Room } from '../../models/room';
import { filter, find, map } from 'rxjs/operators';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    public room$: Observable<Room>;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private pageService: PageService
    ) {
        this.route.params.subscribe(params => {
            this.room$ = this.store.select(RoomsState).pipe(
                filter(rooms => rooms.urlName === params.urlName)
            );
        });

        // this.pageService.setPageTitle(room.getName());
    }

    ngOnInit() {

    }

}
