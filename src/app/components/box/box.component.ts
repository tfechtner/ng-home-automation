import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { SonosPlayerStateEnum, SonosPlayerStateName } from '../../models/sonos/sonos.state';
import { ISonosStateModel, SonosState } from '../../store/state/sonos/sonos.state';
import { SonosActions } from '../../store/state/sonos/sonos.actions';
import { isNullOrUndefined } from '../../utils/functions';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit, OnDestroy, OnChanges {
    @Input() room: string = null;

    public SonosPlayerStateEnum = SonosPlayerStateEnum;
    public SonosPlayerStateName = SonosPlayerStateName;

    public playbackState: string;
    public currentArtwork: string;
    public artist: string;
    public volume: number;
    public mute: boolean;

    @Select(SonosState)
    private _sonosState$: Observable<ISonosStateModel>;

    private _sonosStateSubscription$ = new Subscription();
    private _subscriptions$ = new Subscription();

    constructor(
        private _store: Store
    ) {
        console.log('BoxComponent.constructor');
    }

    public ngOnInit() {
        console.log('BoxComponent.ngOnInit');
        this._initRoomState();
        this._updateRoomState();
    }

    public ngOnDestroy() {
        console.log('BoxComponent.ngOnDestroy');
        this._sonosStateSubscription$.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges) {
        console.log('BoxComponent.ngOnChanges', changes);
        const room = changes['room'];
        if ((!isNullOrUndefined(room.previousValue) && !isNullOrUndefined(room.currentValue)) && room.previousValue !== room.currentValue) {
            console.log('Room changed!');
            this._subscriptions$.remove(this._sonosStateSubscription$);
            this._initRoomState();
        }
    }

    public clickRoomPlay() {
        if (this.playbackState === SonosPlayerStateEnum.PAUSED_PLAYBACK || this.playbackState === SonosPlayerStateEnum.STOPPED) {
            this.roomPlay();
        }
    }

    public clickRoomPause() {
        if (this.playbackState === SonosPlayerStateEnum.PLAYING) {
            this.roomPause();
        }
    }

    public clickRoomMute() {
        this.roomMute();
    }

    public clickRoomVolume(volume: string) {
        if (volume === 'up' && this.volume < 101) {
            this.roomVolume(this.volume + 5);
        } else if (volume === 'down' && this.volume > 0) {
            this.roomVolume(this.volume - 5);
        }
    }

    public clickRoomFavourite(favourite: string) {
        this.roomFavourite(favourite);
    }

    private _setRoomDefaults() {
        this.playbackState = null;
        this.currentArtwork = null;
        this.artist = null;
        this.volume = null;
        this.mute = null;
    }

    private _initRoomState() {
        console.log('BoxComponent._initRoomState', this.room);
        this._setRoomDefaults();
        this._sonosStateSubscription$ = this._store.select(SonosState.room(this.room)).subscribe(roomState => {
            this.playbackState = roomState.playbackState;
            this.currentArtwork = roomState.currentTrack.absoluteAlbumArtUri;
            this.artist = roomState.currentTrack.artist;
            this.volume = roomState.volume;
            this.mute = roomState.mute;
        });
        this._subscriptions$.add(this._sonosStateSubscription$);
    }

    private _updateRoomState() {
        this._store.dispatch(new SonosActions.GetRoomState({ room: this.room }));
        setTimeout(() => {
            if (!this._sonosStateSubscription$.closed) {
                this._updateRoomState();
            }
        }, 1000);
    }

    private roomPlay() {
        this._store.dispatch(new SonosActions.RoomPlay({ room: this.room }));
    }

    private roomPause() {
        this._store.dispatch(new SonosActions.RoomPause({ room: this.room }));
    }

    private roomVolume(volume: number) {
        this._store.dispatch(new SonosActions.RoomVolume({ room: this.room, volume: volume }));
    }

    private roomMute() {
        if (this.mute === false) {
            this._store.dispatch(new SonosActions.RoomMute({ room: this.room }));
        } else {
            this._store.dispatch(new SonosActions.RoomUnmute({ room: this.room }));
        }
    }

    private roomFavourite(favourite: string) {
        this._store.dispatch(new SonosActions.RoomFavourite({ room: this.room, favourite: favourite }));
    }
}
