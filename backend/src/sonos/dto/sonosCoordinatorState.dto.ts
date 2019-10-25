import { SonosTrack } from './sonosTrack.dto';

export class SonosCoordinatorState {
    readonly volume: number;
    readonly mute: boolean;
    readonly equalizer: {
        readonly bass: number;
        readonly treble: number;
        readonly loudness: boolean;
    };
    readonly currentTrack: SonosTrack;
    readonly nextTrack: SonosTrack;
    readonly trackNo: number;
    readonly elapsedTime: number;
    readonly elapsedTimeFormatted: string;
    readonly playbackState: string;
    readonly playMode: {
        readonly repeat: string;
        readonly shuffle: boolean;
        readonly crossfade: boolean;
    };
}
