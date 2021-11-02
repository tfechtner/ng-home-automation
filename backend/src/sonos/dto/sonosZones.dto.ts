import { ISonosCoordinatorDto } from './sonosCoordinator.dto';

export interface ISonosZone {
    uuid: string;
    coordinator: ISonosCoordinatorDto;
    members: ISonosCoordinatorDto[];
}

export interface ISonosZones extends Array<ISonosZone> {}
