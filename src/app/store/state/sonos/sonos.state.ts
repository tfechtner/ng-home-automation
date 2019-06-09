import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SonosActions } from './sonos.actions';
import { ISonosRoomStateJson, SonosService } from '../../../services/sonos/sonos.service';

export const sonosRoomStateDefaults: ISonosRoomStateJson = {
    volume: null,
    mute: null,
    equalizer: {
        bass: null,
        treble: null,
        loudness: null,
    },
    currentTrack: {
        artist: null,
        title: null,
        albumArtUri: null,
        duration: null,
        uri: null,
        trackUri: null,
        type: null,
        stationName: null,
        absoluteAlbumArtUri: null,
    },
    nextTrack: {
        artist: null,
        title: null,
        album: null,
        albumArtUri: null,
        duration: null,
        uri: null,
    },
    trackNo: null,
    elapsedTime: null,
    elapsedTimeFormatted: null,
    playbackState: null,
    playMode: {
        repeat: null,
        shuffle: null,
        crossfade: null,
    }
};

export interface ISonosStateModel {
    isConnected: boolean;
    lounge: ISonosRoomStateJson;
    bedroom: ISonosRoomStateJson;
}

export const defaults: ISonosStateModel = {
    isConnected: null,
    lounge: sonosRoomStateDefaults,
    bedroom: sonosRoomStateDefaults,
};

@State<ISonosStateModel>({
    name: 'Sonos',
    defaults
})
export class SonosState {
    @Selector()
    public static lounge(
        state: ISonosStateModel
    ): ISonosRoomStateJson {
        return state.lounge;
    }
    @Selector()
    public static bedroom(
        state: ISonosStateModel
    ): ISonosRoomStateJson {
        return state.bedroom;
    }

    constructor(
        // private _sonosService: SonosService
    ) {}

    @Action(SonosActions.RoomGetState)
    roomGetState(
        { getState, setState, patchState }: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomGetState) {
        // return this._sonosService.getRoomState(payload.room).pipe(
        //     take(1),
        //     tap( roomState => {
        //         patchState({ [payload.room]: { ...roomState }});
        //     }),
        //     catchError(err => of('Caught error on SonosActions.RoomGetState = ' + err))
        // );

    }
}
