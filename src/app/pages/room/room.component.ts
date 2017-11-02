import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CONFIG } from '../../config/main';
import { Rooms } from '../../models/rooms';
import { Room } from '../../models/room';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {

    rooms: Rooms = new Rooms(CONFIG.rooms);
    room: Room = null;
    roomName: string = null;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            const paramRoomId = CONFIG.routing.room.paramRoomId;
            if (params.hasOwnProperty(paramRoomId)) {
                const room = this.rooms.getRoomById(params[paramRoomId]);
                this.room = room;
                this.roomName = room.getName();
            }
        });

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
