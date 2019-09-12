import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { SonosActions } from './sonos.actions';
import { NestService } from '../../../services/nest/nest.service';
import { SonosZones } from '../../../services/nest/dto/sonosZones.dto';
import { SonosCoordinatorState } from '../../../services/nest/dto/sonosCoordinatorState.dto';

export const sonosRoomStateDefaults: SonosCoordinatorState = {
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
    lounge: SonosCoordinatorState;
    bedroom: SonosCoordinatorState;
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
    ): SonosCoordinatorState {
        return state.lounge;
    }
    @Selector()
    public static bedroom(state: ISonosStateModel
    ): SonosCoordinatorState {
        return state.bedroom;
    }

    public static room(room: string) {
        return createSelector([SonosState], (sonosState: ISonosStateModel): SonosCoordinatorState => {
            if (sonosState.hasOwnProperty(room)) {
                return sonosState[room];
            }
            return null;
        });
    }

    constructor(
        private _nestService: NestService
    ) {}

    @Action(SonosActions.GetZones)
    GetZones(
        { patchState }: StateContext<ISonosStateModel>
    ) {
        return this._nestService.getSonosZones().pipe(
            take(1),
            tap( (sonosZones: SonosZones) => {
                const loungeZone = sonosZones.find(zone => zone.coordinator.roomName === 'Lounge');
                patchState({ lounge: loungeZone.coordinator.state });

                const bedroomZone = sonosZones.find(zone => zone.coordinator.roomName === 'Bedroom');
                patchState({ bedroom: bedroomZone.coordinator.state });
            }),
            catchError(err => of('Caught error on SonosActions.GetZones = ' + err))
        );
    }

    @Action(SonosActions.GetRoomState)
    GetRoomState(
        { patchState }: StateContext<ISonosStateModel>,
        { payload }: SonosActions.GetRoomState) {
        return this._nestService.getSonosRoomState(payload.room).pipe(
            take(1),
            tap( roomState => {
                patchState({ [payload.room]: { ...roomState }});
            }),
            catchError(err => of('Caught error on SonosActions.GetRoomState = ' + err))
        );
    }

    @Action(SonosActions.RoomPlay)
    RoomPlay(
        { getState, setState, patchState }: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomPlay) {
        return this._nestService.getSonosRoomPlay(payload.room).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomPlay = ' + err))
        );
    }

    @Action(SonosActions.RoomPause)
    RoomPause(
        {}: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomPause
    ) {
        return this._nestService.getSonosRoomPause(payload.room).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomPause = ' + err))
        );
    }

    @Action(SonosActions.RoomVolume)
    RoomVolume(
        {}: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomVolume
    ) {
        return this._nestService.getSonosRoomVolume(payload.room, payload.volume).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomVolume = ' + err))
        );
    }

    @Action(SonosActions.RoomMute)
    RoomMute(
        {}: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomMute
    ) {
        return this._nestService.getSonosRoomMute(payload.room, true).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomMute = ' + err))
        );
    }

    @Action(SonosActions.RoomUnmute)
    RoomUnmute(
        {}: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomUnmute
    ) {
        return this._nestService.getSonosRoomMute(payload.room, false).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomUnmute = ' + err))
        );
    }

    @Action(SonosActions.RoomFavourite)
    RoomFavourite(
        {}: StateContext<ISonosStateModel>,
        { payload }: SonosActions.RoomFavourite
    ) {
        return this._nestService.getSonosRoomFavourite(payload.room, payload.favourite).pipe(
            take(1),
            catchError(err => of('Caught error on SonosActions.RoomFavourite = ' + err))
        );
    }
}
