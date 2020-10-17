import { environment } from '@environment/environment';
import { NgxsModuleOptions } from '@ngxs/store';
import { SettingsState } from './settings/settings.state';
import { SonosState } from './sonos/sonos.state';
import { NetworkState } from './network/network.state';
import { RoomsState } from './rooms/rooms.state';
import { FibaroState } from './fibaro/fibaro.state';

export const appState = [
    FibaroState,
    NetworkState,
    RoomsState,
    SettingsState,
    SonosState
];

export const appStateOptions: NgxsModuleOptions = {
    developmentMode: !environment.production,
    selectorOptions: {
        suppressErrors: false // environment.production
    }
};
