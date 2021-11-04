import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class CheckForUpdateService implements OnDestroy {

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private _store: Store,
        private _swUpdate: SwUpdate,
        private _toastrService: NbToastrService,
        @Inject(DOCUMENT) private _document: Document
    ) { }

    public ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    public init(): void {
        if (this.isServiceWorkerEnabled()) {
            this._swUpdate.checkForUpdate();

            this._swUpdate.available.pipe(takeUntil(this._destroyed$))
                .subscribe((updateAvailableEvent: UpdateAvailableEvent) => {
                    console.log(updateAvailableEvent);
                    this._swUpdate.activateUpdate().then(() => {
                        this._toastrService.show(
                            'Updated',
                            `Updated to the latest version`,
                            {
                                status: 'success',
                                duration: 2000,
                                hasIcon: true,
                                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                                preventDuplicates: false
                            });
                    });
                });
        }
    }

    public forceUpdate(): Promise<void> {
        if (this._swUpdate.isEnabled) {
            return this._swUpdate.checkForUpdate();
        }
    }

    public isServiceWorkerEnabled(): boolean {
        return this._swUpdate.isEnabled;
    }

    public reload(): void {
        this._document.location.reload();
    }
}
