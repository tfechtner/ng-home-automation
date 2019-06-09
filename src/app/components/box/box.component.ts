import {Component, Input, OnInit} from '@angular/core';

import { SonosPlayerStateEnum, SonosPlayerStateName } from '../../models/sonos/sonos.state';
import { SonosStateAdapter } from '../../adaptors/sonos/sonos.adaptor';
import { Select } from '@ngxs/store';
import { ISonosStateModel, SonosState } from '../../store/state/sonos/sonos.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
    @Input() room: string = null;

    public SonosPlayerStateEnum = SonosPlayerStateEnum;
    public SonosPlayerStateName = SonosPlayerStateName;

    public playbackState: string = null;
    public currentArtwork: string = null;
    public artist: string = null;

    @Select(SonosState)
    private _sonosState$: Observable<ISonosStateModel>;

    constructor() {}

    ngOnInit() {
        // this._initRoomState();
    }

    public clickRoomToggle() {
        if (this.playbackState === SonosPlayerStateEnum.PLAYING) {
            this.roomPause();
        } else if (this.playbackState === SonosPlayerStateEnum.PAUSED_PLAYBACK || this.playbackState === SonosPlayerStateEnum.STOPPED) {
            this.roomPlay();
        }
    }

    public clickRoomFavourite(favourite: string) {
        console.log('BoxComponent.clickRoomFavourite', favourite);
        this.roomFavourite(favourite);
    }

    private _initRoomState() {
        this._sonosState$.subscribe(sonosState => {
            // const roomState = sonosState[this.room.name.toLowerCase()];
            // console.log(roomState);
            // this.playbackState = roomState.playbackState;
            // this.currentArtwork = roomState.currentTrack.albumArtUri;
            // this.artist = roomState.currentTrack.artist;
        });
    }

    private roomPause() {
        console.log('BoxComponent.roomPause');

    }

    private roomPlay() {
        console.log('BoxComponent.roomPlay');
    }

    private roomFavourite(favourite: string) {
        console.log('BoxComponent.roomFavourite');
    }

    private roomSay(sentence: string, volume: number) {
        console.log('BoxComponent.roomSay');
    }

}
