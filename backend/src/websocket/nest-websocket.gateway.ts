import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FibaroEvent } from '../fibaro/dto/fibaroEvent.dto';
import { SonosEvent } from '../sonos/dto/sonsoEvent.dto';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private _logger: Logger
    ) {
        this._logger = new Logger('WebsocketGateway');
    }

    @WebSocketServer()server: Server;

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this._logger.log('Handle message');
        this.server.emit('msgToClient', payload);
    }

    afterInit(server: Server) {
        this._logger.log('Initiliased');
    }

    handleDisconnect(client: Socket) {
        this._logger.log(`Client disconnected`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this._logger.log(`Client connected`);
    }

    emitSonosEvent(event: SonosEvent) {
        this.server.emit('sonosEvent', event);
    }

    emitFibaroEvent(event: FibaroEvent) {
        this.server.emit('fibaroEvent', event);
    }
}
