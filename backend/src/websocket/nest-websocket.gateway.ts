import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FibaroEvent } from '../fibaro/dto/fibaroEvent.dto';
import { SonosEvent } from '../sonos/dto/sonsoEvent.dto';

@WebSocketGateway()
export class NestWebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NestWebsocketGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.logger.log('[ WebSocket ] Handle message');
        this.server.emit('msgToClient', payload);
    }

    afterInit(server: Server) {
        this.logger.log('[ WebSocket ] Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`[ WebSocket ] Client disconnected`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`[ WebSocket ] Client connected`);
    }

    emitSonosEvent(event: SonosEvent) {
        this.server.emit('[ WebSocket ] Emit Sonos event', event);
    }

    emitFibaroEvent(event: FibaroEvent) {
        this.server.emit('[ WebSocket ] Emit Fibaro event', event);
    }
}
