import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as io from 'socket.io-client';
import { CONFIG } from '../../config/main';
import Socket = SocketIOClient.Socket;

@Injectable()
export class NestWebsocketService {
    private socket: Socket;

    constructor(
        private _toastrService: NbToastrService
    ) {
        console.log('NestWebsocketService.constructor');
    }

    connect() {
        console.log('NestWebsocketService.connect');
        this.socket = io.connect(CONFIG.API.nest);

        this.socket.on('connect', () => {
            console.log('NestWebsocketService.connect connect');
            this._toastrService.show(
                'Connected',
                `NestWebsocketService`,
                {
                    status: 'success',
                    destroyByClick: true,
                    duration: 2000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false
                });
        });

        this.socket.on('disconnect', (reason) => {
            console.log('NestWebsocketService.connect disconnect', reason);
            this._toastrService.show(
                'Disconnected',
                `NestWebsocketService`,
                {
                    status: 'danger',
                    destroyByClick: true,
                    duration: 2000,
                    hasIcon: true,
                    position: NbGlobalPhysicalPosition.TOP_RIGHT,
                    preventDuplicates: false
                });
        });

        this.socket.on('msgToClient', event => {
            console.log('msgToClient', event);
        });

        this.socket.on('sonosEvent', event => {
            console.log('sonosEvent', event);
        });

        return () => this.socket.disconnect();
    }

    add(title: string) {
        console.log('NestWebsocketService.add');
        this.socket.emit('msgToServer', { 'message': 'tom works websocket' });
    }
}
