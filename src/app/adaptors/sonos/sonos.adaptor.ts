import {ISonosAdaptor} from './sonos.adaptor.interface';

export class SonosStateAdapter implements ISonosAdaptor {
    protected _data: any;

    constructor(stateData: object) {
        this._data = {
            volume: stateData['volume'],
            mute: stateData['mute'],
            playbackState: stateData['playbackState'],
            absoluteAlbumArtUri: stateData['currentTrack']['absoluteAlbumArtUri']
        };
    }

    public getJson() {
        return this._data;
    }
}
