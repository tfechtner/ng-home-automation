export enum SonosPlayerStateEnum {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED_PLAYBACK = 'PAUSED_PLAYBACK'
}

export const SonosPlayerStateName = new Map<string, string>([
    [ SonosPlayerStateEnum.PLAYING, 'Playing' ],
    [ SonosPlayerStateEnum.STOPPED, 'Stopped' ],
    [ SonosPlayerStateEnum.PAUSED_PLAYBACK, 'Paused' ]
]);

export interface ISonosState {
    volume: number;
    mute: boolean;
    playbackState: string;
    albumArtUri: string;
    artist: string;
}

export class SonosState {
    private _volume: number;
    private _mute: boolean;
    private _playbackState: string;
    private _albumArtUri: string;
    private _artist: string;

    constructor(sonosStateData: ISonosState) {
        Object.assign(this, sonosStateData);
    }

    get volume(): number {
        return this._volume;
    }

    set volume(volume: number) {
        this._volume = volume;
    }

    get mute(): boolean {
        return this._mute;
    }

    set mute(mute: boolean) {
        this._mute = mute;
    }

    get playbackState(): string {
        return this._playbackState;
    }

    set playbackState(playbackState: string) {
        this._playbackState = playbackState;
    }

    get albumArtUri(): string {
        return this._albumArtUri;
    }

    set albumArtUri(uri: string) {
        this._albumArtUri = uri;
    }

    get artist(): string {
        return this._artist;
    }

    set artist(value: string) {
        this._artist = value;
    }
}
