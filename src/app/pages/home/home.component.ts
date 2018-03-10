import {Component, OnInit} from '@angular/core';

import {PageService} from '../../services/page/page.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.pageService.setPageTitle('Home');
    }

}
