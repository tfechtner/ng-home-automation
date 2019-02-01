export interface ISonosState {
    volume: number;
    mute: boolean;
    playbackState: string;
    absoluteAlbumArtUri: string;
}

export class SonosState {
    private _volume: number;
    private _mute: boolean;
    private _playbackState: string;
    private _absoluteAlbumArtUri: string;

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

    get absoluteAlbumArtUri(): string {
        return this._absoluteAlbumArtUri;
    }

    set absoluteAlbumArtUri(uri: string) {
        this._absoluteAlbumArtUri = uri;
    }
}
