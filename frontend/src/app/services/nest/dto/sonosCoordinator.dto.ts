import { SonosCoordinatorState } from './sonosCoordinatorState.dto';

export class SonosCoordinator {
    readonly uuid: string;
    readonly state: SonosCoordinatorState;
    readonly roomName: string;
    readonly coordinator: string;
    readonly groupState: {
        readonly volume: number;
        readonly mute: boolean;
    };
}
