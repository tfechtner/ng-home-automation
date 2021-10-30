import { environment } from '@environment/environment';
import { NgxsModuleOptions } from '@ngxs/store';
import { SettingsState } from './settings/settings.state';
import { SonosState } from './sonos/sonos.state';
import { NetworkState } from './network/network.state';
import { RoomsState } from './rooms/rooms.state';
import { DeviceState } from './device/device.state';

export const appState = [
    DeviceState,
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
