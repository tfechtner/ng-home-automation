import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { NetworkActions } from './store/state/network/network.actions';

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
       this._updateApiState();
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


