import {Component, Input, OnInit} from '@angular/core';

import { SonosService } from '../../services/sonos.service';

const PLAYER_STATE_PLAYING = 'PLAYING';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
    @Input() id: string = null;
    @Input() title: string = null;

    playerState: string = null;

    constructor(private sonosService: SonosService) {
    }

    ngOnInit() {
    }

    clickRoomPause() {
        this.sonosService.getRoomPause(this.id).subscribe(
            data => {
                console.log('data', data);
                this.playerState = PLAYER_STATE_PLAYING;
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
