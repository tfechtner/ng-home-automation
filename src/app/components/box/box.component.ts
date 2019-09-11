import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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

    public playbackState: string = null;
    public currentArtwork: string = null;
    public artist: string = null;

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
    }

    public ngOnDestroy() {
        console.log('BoxComponent.ngOnDestroy');
        this._sonosStateSubscription$.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges) {
        console.log('BoxComponent.ngOnChanges', changes);
        const room = changes['room'];
        if ((!isNullOrUndefined(room.previousValue) && !isNullOrUndefined(room.currentValue)) && room.previousValue !== room.currentValue) {
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

    public clickRoomFavourite(favourite: string) {
        console.log('BoxComponent.clickRoomFavourite', favourite);
        this.roomFavourite(favourite);
    }

    private _initRoomState() {
        console.log('BoxComponent._initRoomState', this.room);
        this._sonosStateSubscription$ = this._store.select(SonosState.room(this.room)).subscribe(sonosState => {
            const roomState = sonosState;
            this.playbackState = roomState.playbackState;
            this.currentArtwork = roomState.currentTrack.albumArtUri;
            this.artist = roomState.currentTrack.artist;
        });
        this._subscriptions$.add(this._sonosStateSubscription$);
        this._updateRoomState();
    }

    private _updateRoomState() {
        this._store.dispatch(new SonosActions.GetRoomState({ room: this.room }));
        setTimeout(() => {
            if (!this._sonosStateSubscription$.closed) {
                this._updateRoomState();
            }
        }, 250);
    }

    private roomPlay() {
        this._store.dispatch(new SonosActions.RoomPlay({ room: this.room }));
    }

    private roomPause() {
        this._store.dispatch(new SonosActions.RoomPause({ room: this.room }));
    }

    private roomFavourite(favourite: string) {
        console.log('BoxComponent.roomFavourite');
    }

    private roomSay(sentence: string, volume: number) {
        console.log('BoxComponent.roomSay');
    }

}
