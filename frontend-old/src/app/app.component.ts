import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { NetworkActions } from './store/state/network/network.actions';
import { RoomsActions } from './store/state/rooms/rooms.actions';
import { SonosActions } from './store/state/sonos/sonos.actions';
import { FibaroActions } from './store/state/fibaro/fibaro.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(
        private _store: Store
    ) {
        console.log('AppComponent.constructor');
        this._updateApiState();
        this._store.dispatch([
            new RoomsActions.GetsRoomsAction(),
            new SonosActions.GetZones(),
            new FibaroActions.GetRooms(),
            new FibaroActions.GetDevices()
        ]);
    }

    private _updateApiState() {
        this._store.dispatch([
            new NetworkActions.GetApiState()
        ]);
        setTimeout(() => {
            this._updateApiState();
        }, 5000);
    }
}


