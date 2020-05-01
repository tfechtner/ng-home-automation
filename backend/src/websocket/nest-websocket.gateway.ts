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
import { SonosEvent } from '../sonos/dto/sonsoEvent.dto';

@WebSocketGateway()
export class NestWebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NestWebsocketGateway');

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.logger.log('WebSocketServer handleMessage');
        this.server.emit('msgToClient', payload);
    }

    afterInit(server: Server) {
        this.logger.log('WebSocketServer Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`WebSocketServer Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`WebSocketServer Client connected: ${client.id}`);
    }

    emitSonosEvent(event: SonosEvent) {
        this.server.emit('sonosEvent', event);
    }
}
