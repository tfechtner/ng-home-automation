import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { Select, Store } from '@ngxs/store';
import { RoomsState } from '../../store/state/rooms/rooms.state';
import { Observable } from 'rxjs/internal/Observable';
import { Room } from '../../models/room';
import { FibaroActions } from '../../store/state/fibaro/fibaro.actions';

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
        private _store: Store
    ) {
    }

    ngOnInit() {
        this.pageService.setPageTitle('Home');
    }

    public click() {
        this._store.dispatch(new FibaroActions.GetDevice({id: 51}));
    }
}
