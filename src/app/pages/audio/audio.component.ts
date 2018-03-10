import {Component, OnInit} from '@angular/core';

import {PageService} from '../../services/page/page.service';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

    constructor(
        private pageService: PageService
    ) {}

    ngOnInit() {
        this.pageService.setPageTitle('Audio');
    }

}
