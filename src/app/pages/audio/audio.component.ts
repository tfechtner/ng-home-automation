import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { SonosService } from '../../services/sonos/sonos.service';
import { SonosServiceMock } from '../../services/sonos/sonos.service.mock';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss'],
    providers: [ SonosServiceMock ]
})
export class AudioComponent implements OnInit, OnDestroy {

    subscriptions: Array<Subscription> = [];

    constructor(
        private pageService: PageService,
        private sonosService: SonosServiceMock
    ) {}

    ngOnInit() {
        this.pageService.setPageTitle('Audio');
        this.sonosService.getState().subscribe((state) => {
            // Write adaptor
            console.log(state);
        });
    }

    ngOnDestroy() {
        if (this.subscriptions.length > 0) {
            for (let subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

}
