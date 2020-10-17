import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingHouseModeEnum } from '@backend/settings/enums/settingHouseModes.enum';
import { SettingKeysEnum } from '@backend/settings/enums/settingKeys.enum';
import { NbThemeService } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SettingsActions } from '../../@state/settings/settings.actions';
import { SettingsState } from '../../@state/settings/settings.state';

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

    public themes = [
        {
            value: 'default',
            name: 'Light'
        },
        {
            value: 'dark',
            name: 'Dark'
        },
        {
            value: 'cosmic',
            name: 'Cosmic'
        },
        {
            value: 'corporate',
            name: 'Corporate'
        }
    ];

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

    public currentTheme = 'default';
    public currentHouseMode = '';

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    // private alive = true;

    constructor(
        private _store: Store,
        private _themeService: NbThemeService
    ) { }

    ngOnInit() {
        this.currentTheme = this._themeService.currentTheme;

        this._themeService.onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this._destroyed$)
            ).subscribe(themeName => this.currentTheme = themeName);

        this._store.select(SettingsState.setting(SettingKeysEnum.HOUSE_MODE))
            .pipe(takeUntil(this._destroyed$))
            .subscribe(houseMode => this.currentHouseMode = houseMode);
    }

    ngOnDestroy() {
        // this.alive = false;
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    changeTheme(themeValue: string) {
        this._themeService.changeTheme(themeValue);
    }

    changeHouseMode(houseMode: SettingHouseModeEnum) {
        this._store.dispatch(new SettingsActions.SetHouseMode({ houseMode: houseMode }));
    }
}
