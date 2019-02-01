import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { SonosService } from '../../services/sonos/sonos.service';
import { SonosServiceMock } from '../../services/sonos/sonos.service.mock';
import { Subscription } from 'rxjs/Subscription';
import { SonosState } from '../../models/sonos/sonos.state';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {

    private sonosState: SonosState = null;
    private subscriptions: Array<Subscription> = [];

    constructor(
        private pageService: PageService,
        private sonosService: SonosService
    ) {}

    ngOnInit() {
        console.log('AudioComponent.ngOnInit');
        this.pageService.setPageTitle('Audio');

        const sonosSubscription = this.sonosService.getState().subscribe(sonosState => {
            console.log('sonosState updated: ', sonosState);
        });
        this.subscriptions.push(sonosSubscription);

    }

    ngOnDestroy() {
        if (this.subscriptions.length > 0) {
            for (let subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

}
