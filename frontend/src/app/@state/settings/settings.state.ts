import { Injectable } from '@angular/core';
import { SettingDto } from '@backend/settings/dto/setting.dto';
import { SettingKeysEnum } from '@backend/settings/enums/settingKeys.enum';
import { Settings } from '@models/settings.model';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { NestService } from '@services/nest/nest.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SettingsActions } from './settings.actions';

export interface SettingsStateModel {
    settings: Settings;
}

const defaults: SettingsStateModel = {
    settings: new Settings([
        [SettingKeysEnum.HOUSE_MODE, null]
    ])
};

@State<SettingsStateModel>({
    name: 'Settings',
    defaults
})
@Injectable()
export class SettingsState {

    public static setting(settingKey: SettingKeysEnum) {
        return createSelector([ SettingsState ], (settingsState: SettingsStateModel) => {
            return settingsState.settings?.get(settingKey);
        });
    }

    constructor(
        private _nestService: NestService
    ) {}

    @Action(SettingsActions.GetSettings)
    getSettings(
        { getState, setState }: StateContext<SettingsStateModel>
    ): Observable<any> {
        return this._nestService.getSettings().pipe(
            tap(  (settingsDto: SettingDto[]) => {
                const settings = getState().settings;
                settingsDto.forEach(setting => settings.set(setting.key, setting.value));
                setState({
                    settings: settings
                });
                console.log(getState());
                return of();
            }),
            catchError((error) => {
                // Add loading error state
                return of('[ SettingsState ] Error GetsSettingsAction = ' + error);
            })
        );
    }

    @Action(SettingsActions.SetHouseMode)
    setSetting(
        { getState, setState, patchState }: StateContext<SettingsStateModel>,
        { payload }: SettingsActions.SetHouseMode
    ): Observable<any> {
        return this._nestService.setHouseMode(payload.houseMode).pipe(
            tap(  (settingDto: SettingDto) => {
                patchState({
                    ...getState(),
                    settings: getState().settings.set(SettingKeysEnum.HOUSE_MODE, settingDto.value)
                });
                return of();
            }),
            catchError((error) => {
                // Add loading error state
                return of('[ SettingsState ] Error SetHouseMode = ' + error);
            })
        );
    }
}
