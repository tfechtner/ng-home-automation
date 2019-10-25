import { SonosState } from './sonos/sonos.state';
import { NetworkState } from './network/network.state';
import { RoomsState } from './rooms/rooms.state';

export const appState = [
    NetworkState,
    RoomsState,
    SonosState
];
