import { SonosState } from './sonos/sonos.state';
import { NetworkState } from './network/network.state';
import { RoomsState } from './rooms/rooms.state';
import { FibaroState } from './fibaro/fibaro.state';

export const appState = [
    FibaroState,
    NetworkState,
    RoomsState,
    SonosState
];
