import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../config/main';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

    roomUrl = CONFIG.routing.room.url;
    rooms = CONFIG.rooms;

    constructor() {
    }

    ngOnInit() {

    }

}
