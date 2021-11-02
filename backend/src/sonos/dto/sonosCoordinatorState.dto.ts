import { ISonosTrack } from './sonosTrack.dto';

export interface ISonosCoordinatorState {
    volume: number;
    mute: boolean;
    equalizer: {
        bass: number;
        treble: number;
        loudness: boolean;
    };
    currentTrack: ISonosTrack;
    nextTrack: ISonosTrack;
    trackNo: number;
    elapsedTime: number;
    elapsedTimeFormatted: string;
    playbackState: string;
    playMode: {
        repeat: string;
        shuffle: boolean;
        crossfade: boolean;
    };
}
