import { Component, OnInit } from '@angular/core';
import { NestService } from './services/nest/nest.service';
import { NestWebsocketService } from './services/websocket/nest-websocket.service';

@Component({
    selector: 'ngx-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    constructor(
        private nestService: NestService,
        private nestWebsocketService: NestWebsocketService
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.nestWebsocketService.connect();
            this.nestService.getRooms().subscribe((rooms) => console.log(rooms));
            this.nestWebsocketService.add('fsd');
        }, 0);

    }
}
