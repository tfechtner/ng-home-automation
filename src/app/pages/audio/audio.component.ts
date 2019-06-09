import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../config/main';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {

    public rooms = CONFIG.rooms;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private pageService: PageService,
    ) {}

    ngOnInit() {
        console.log('AudioComponent.ngOnInit');
        this.pageService.setPageTitle('Audio');
    }

    ngOnDestroy() {
        if (this.subscriptions.length > 0) {
            for (let subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

}
