import {Component, Input, OnInit} from '@angular/core';

import { SonosService } from '../../services/sonos/sonos.service';
import { SonosState } from '../../models/sonos/sonos.state';
import { SonosStateAdapter } from '../../adaptors/sonos/sonos.adaptor';

export const PLAYER_STATE_PLAYING = 'PLAYING';
export const PLAYER_STATE_STOPPED = 'STOPPED';
export const PLAYER_STATE_PAUSED = 'PAUSED_PLAYBACK';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
    @Input() id: string = null;
    @Input() title: string = null;

    public PLAYER_STATE_PLAYING = PLAYER_STATE_PLAYING;
    public PLAYER_STATE_STOPPED = PLAYER_STATE_STOPPED;
    public PLAYER_STATE_PAUSED = PLAYER_STATE_PAUSED;

    public playbackState: string = null;
    public currentArtwork: string = null;

    constructor(private sonosService: SonosService) {
    }

    ngOnInit() {
        this.updateRoomState();
    }

    public clickRoomToggle() {
        if (this.playbackState === PLAYER_STATE_PLAYING) {
            this.roomPause();
        } else if (this.playbackState === PLAYER_STATE_PAUSED || this.playbackState === PLAYER_STATE_STOPPED) {
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
                this.currentArtwork = sonosState.absoluteAlbumArtUri;
            },
            (error) => {
                console.log(error);
            },
            () => {
                setTimeout(() => {
                    this.updateRoomState();
                }, 5000);
            }
        );
    }

    private roomPause() {
        console.log('BoxComponent.roomPause');
        this.sonosService.getRoomPause(this.id).subscribe(
            data => {
                this.playbackState = PLAYER_STATE_PAUSED;
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
                this.playbackState = PLAYER_STATE_PLAYING;
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
