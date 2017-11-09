import { Component, OnInit } from '@angular/core';

import { SonosService } from '../../services/sonos.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {

    connectedToSonos: boolean = null;

    constructor(private sonosService: SonosService) {

    }

    ngOnInit() {
        // TODO: TopNavComponent - Subscribe to state updates from sonos service
        setTimeout(() => {
            this.connectedToSonos = this.sonosService.isConnected();
        }, 0);
    }

}
