import {ISonosAdaptor } from './sonos.adaptor.interface';

export class SonosStateAdapter implements ISonosAdaptor {
    protected _data: any;

    constructor(stateData: object) {
        this._data = {
            volume: stateData['volume'],
            mute: stateData['mute'],
            playbackState: stateData['playbackState'],
            albumArtUri: stateData['currentTrack']['absoluteAlbumArtUri'],
            artist: stateData['currentTrack']['artist']
        };
    }

    public getJson() {
        return this._data;
    }
}
