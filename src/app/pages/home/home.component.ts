import {Component, OnInit} from '@angular/core';

import {PageService} from '../../services/page/page.service';
import { CONFIG } from '../../config/main';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public rooms = CONFIG.rooms;

    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.pageService.setPageTitle('Home');
    }

}
