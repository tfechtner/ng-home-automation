import {Component, OnDestroy, OnInit} from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { Observable, Subscription } from 'rxjs';
import { NestService } from '../../services/nest/nest.service';
import { Select } from '@ngxs/store';
import { INetworkStateModel, NetworkState } from '../../store/state/network/network.state';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
    @Select(NetworkState)
    public _networkState$: Observable<INetworkStateModel>;

    public pageTitle = '';
    public time = new Date();
    public isApiConnected: boolean = null;

    private pageTitleSubscription: Subscription;

    constructor(
        private _nestService: NestService,
        private _pageService: PageService
    ) {}

    ngOnInit() {
        this.getTime();
        this.pageTitleSubscription = this._pageService.getPageTitle().subscribe(title => {
            this.pageTitle = title;
        });
        this._networkState$.subscribe( (networkState: INetworkStateModel) => {
            this.isApiConnected = networkState.isApiConnected;
        });
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
