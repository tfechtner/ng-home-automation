import {Component, OnDestroy, OnInit} from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { SonosService } from '../../services/sonos/sonos.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {

    connectedToSonos: boolean = null;
    pageTitle = '';
    time = new Date();

    private pageTitleSubscription: Subscription;

    constructor(
        private sonosService: SonosService,
        private pageService: PageService
    ) {}

    ngOnInit() {
        this.getTime();
        this.pageTitleSubscription = this.pageService.getPageTitle().subscribe(title => {
            this.pageTitle = title;
        });

        // TODO: TopNavComponent - Subscribe to state updates from sonos service
        setTimeout(() => {
            this.connectedToSonos = this.sonosService.isConnected();
        }, 0);
    }

    ngOnDestroy() {
        this.pageTitleSubscription.unsubscribe();
    }

    public getTime() {
        setTimeout(() => {
            this.time = new Date();
        }, 5000);
    }
}
