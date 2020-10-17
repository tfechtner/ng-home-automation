import { SonosCoordinator } from './sonosCoordinator.dto';

export class SonosZone {
    readonly uuid: string;
    readonly coordinator: SonosCoordinator;
    readonly members: SonosCoordinator[];
}

export class SonosZones extends Array<SonosZone> {}
