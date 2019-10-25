import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Select } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Observable } from 'rxjs/internal/Observable';
import { Room } from '../../models/room';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    @Select(RoomsState)
    public rooms$: Observable<Room>;

    constructor(
        private pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.pageService.setPageTitle('Home');
    }

}
