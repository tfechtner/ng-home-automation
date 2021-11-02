import { ISonosCoordinator } from './sonosCoordinator.dto';

export interface ISonosDevice {
    uuid: string;
    coordinator: ISonosCoordinator;
    members: ISonosCoordinator[];
}

export interface ISonosDto {
    roomName: string;
    volume: number;
    playbackState: string;
}

export const sonosDtoDefaults = {
    roomName: null,
    volume: null,
    playbackState: null
};
