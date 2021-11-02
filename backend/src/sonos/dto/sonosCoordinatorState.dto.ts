import { ISonosTrackDto } from './sonosTrack.dto';

export interface ISonosCoordinatorStateDto {
    volume: number;
    mute: boolean;
    equalizer: {
        bass: number;
        treble: number;
        loudness: boolean;
    };
    currentTrack: ISonosTrackDto;
    nextTrack: ISonosTrackDto;
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
