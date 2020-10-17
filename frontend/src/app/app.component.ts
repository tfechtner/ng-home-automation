import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NestService } from '@services/nest/nest.service';
import { NestWebsocketService } from '@services/websocket/nest-websocket.service';
import { SettingsActions } from './@state/settings/settings.actions';

@Component({
    selector: 'ngx-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    constructor(
        private _store: Store,
        private _nestService: NestService,
        private _nestWebsocketService: NestWebsocketService
    ) { }

    ngOnInit(): void {
        this._store.dispatch(new SettingsActions.GetSettings());
        // this._nestService.getRooms().subscribe((rooms) => console.log(rooms));

        setTimeout(() => {
            this._nestWebsocketService.connect();
            // this._nestWebsocketService.add('fsd');
        }, 500);
    }
}
