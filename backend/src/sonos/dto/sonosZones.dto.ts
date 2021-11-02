import { ISonosCoordinator } from './sonosCoordinator.dto';

export interface ISonosZone {
    uuid: string;
    coordinator: ISonosCoordinator;
    members: ISonosCoordinator[];
}

export interface ISonosZones extends Array<ISonosZone> {}
