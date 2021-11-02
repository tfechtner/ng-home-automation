import { ISonosCoordinatorStateDto } from './sonosCoordinatorState.dto';

export interface ISonosCoordinatorDto {
    uuid: string;
    state: ISonosCoordinatorStateDto;
    roomName: string;
    coordinator: string;
    groupState: {
        volume: number;
        mute: boolean;
    };
}
