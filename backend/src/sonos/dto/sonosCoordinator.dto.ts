import { ISonosCoordinatorState } from './sonosCoordinatorState.dto';

export interface ISonosCoordinator {
    uuid: string;
    state: ISonosCoordinatorState;
    roomName: string;
    coordinator: string;
    groupState: {
        volume: number;
        mute: boolean;
    };
}
