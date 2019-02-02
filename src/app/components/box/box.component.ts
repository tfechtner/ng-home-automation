import {Component, Input, OnInit} from '@angular/core';

import { SonosService } from '../../services/sonos/sonos.service';
import {
    SonosPlayerStateEnum, SonosPlayerStateName,
    SonosState
} from '../../models/sonos/sonos.state';
import { SonosStateAdapter } from '../../adaptors/sonos/sonos.adaptor';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
    @Input() id: string = null;
    @Input() title: string = null;

    public SonosPlayerStateEnum = SonosPlayerStateEnum;
    public SonosPlayerStateName = SonosPlayerStateName;

    public playbackState: string = null;
    public currentArtwork: string = null;
    public artist: string = null;

    constructor(
        private sonosService: SonosService
    ) {}

    ngOnInit() {
        this.updateRoomState();
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

    private updateRoomState() {

        this.sonosService.getRoomState(this.id).subscribe(
            stateData => {
                console.log('stateData', stateData);

                const sonosStateAdapter = new SonosStateAdapter(stateData);
                const sonosState = new SonosState( sonosStateAdapter.getJson() );

                this.playbackState = sonosState.playbackState;
                this.currentArtwork = sonosState.albumArtUri;
                this.artist = sonosState.artist;
            },
            (error) => {
                console.log(error);
            },
            () => {
                setTimeout(() => {
                    this.updateRoomState();
                }, 1000);
            }
        );
    }

    private roomPause() {
        console.log('BoxComponent.roomPause');
        this.sonosService.getRoomPause(this.id).subscribe(
            data => {
                console.log('Paused', data);
                // this.playbackState = SonosPlayerStateEnum.PAUSED_PLAYBACK;
                // this.updateRoomState();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private roomPlay() {
        console.log('BoxComponent.roomPlay');
        this.sonosService.getRoomPlay(this.id).subscribe(
            data => {
                console.log('Play', data);
                // this.playbackState = SonosPlayerStateEnum.PLAYING;
                // this.updateRoomState();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private roomFavourite(favourite: string) {
        console.log('BoxComponent.roomFavourite');
        // this.roomSay(favourite, 20);
        this.sonosService.getRoomFavourite(this.id, favourite).subscribe(
            data => {

            },
            (error) => {
                console.log(error);
            }
        );
    }

    private roomSay(sentence: string, volume: number) {
        console.log('BoxComponent.roomSay');
        this.sonosService.getRoomSay(this.id, sentence, volume).subscribe(
            data => {

            },
            (error) => {
                console.log(error);
            }
        );
    }

}
