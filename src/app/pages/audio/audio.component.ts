import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Room } from '../../models/room';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
    @Select(RoomsState)
    public rooms$: Observable<Room>;

    constructor(
        private pageService: PageService,
    ) {}

    ngOnInit() {
        this.pageService.setPageTitle('Audio');
    }
}
