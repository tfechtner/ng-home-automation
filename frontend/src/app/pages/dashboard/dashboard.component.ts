import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingHouseModeEnum } from '@backend/settings/enums/settingHouseModes.enum';
import { SettingKeysEnum } from '@backend/settings/enums/settingKeys.enum';
import { Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsActions } from '../../@state/settings/settings.actions';
import { SettingsState } from '../../@state/settings/settings.state';

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

    public houseModes = [
        {
            value: SettingHouseModeEnum.HOME,
            name: SettingHouseModeEnum.HOME
        },
        {
            value: SettingHouseModeEnum.AWAY,
            name: SettingHouseModeEnum.AWAY
        },
        {
            value: SettingHouseModeEnum.NIGHTTIME,
            name: 'Night Time'
        }
    ];
    public currentHouseMode = '';

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private _store: Store
    ) { }

    ngOnInit() {
        this._store.select(SettingsState.setting(SettingKeysEnum.HOUSE_MODE))
            .pipe(takeUntil(this._destroyed$))
            .subscribe(houseMode => this.currentHouseMode = houseMode);
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    changeHouseMode(houseMode: SettingHouseModeEnum) {
        this._store.dispatch(new SettingsActions.SetHouseMode({ houseMode: houseMode }));
    }
}
