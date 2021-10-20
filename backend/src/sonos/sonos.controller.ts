import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/nest-websocket.gateway';
import { SonosEvent, SonosEventType } from './dto/sonsoEvent.dto';
import { SonosService } from './sonos.service';

@Controller('sonos')
export class SonosController {
    constructor(
        private readonly _sonosService: SonosService,
        private _websocketGateway: WebsocketGateway,
        private _logger: Logger
    ) {
        this._logger = new Logger('SonosController');
    }

    @Get('zones')
    getZones() {
        return this._sonosService.getZones();
    }

    @Get(':room')
    getRoom(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomState(room);
    }

    @Get(':room/play')
    roomPlay(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomPlay(room);
    }

    @Get(':room/pause')
    roomPause(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomPause(room);
    }

    @Get(':room/next')
    roomNext(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomNext(room);
    }

    @Get(':room/previous')
    roomPrevious(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomPrevious(room);
    }

    @Get(':room/volume/:volume')
    roomVolume(
        @Param('room') room: string,
        @Param('volume') volume: number
    ): any {
        return this._sonosService.getRoomVolume(room, volume);
    }

    @Get(':room/mute')
    roomMute(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomMute(room, true);
    }

    @Get(':room/unmute')
    roomUnMute(
        @Param('room') room: string
    ): any {
        return this._sonosService.getRoomMute(room, false);
    }

    @Get('favourites')
    roomFavourites(): any {
        return this._sonosService.getFavourites();
    }

    @Get(':room/favourite/:favourite')
    roomFavourite(
        @Param('room') room: string,
        @Param('favourite') favourite: string
    ): any {
        return this._sonosService.getRoomFavourite(room, favourite);
    }

    @Post('event')
    async sonos(@Body() sonosEvent: SonosEvent) {
        switch (sonosEvent.type) {
            case SonosEventType.VOLUME_CHANGE:
                this._logger.log('Event: VOLUME_CHANGE');
                break;
            case SonosEventType.TRANSPORT_STATE:
                this._logger.log('Event: TRANSPORT_STATE');
                break;
            default:
                this._logger.log('Event: Uncaught yet');
        }
        this._websocketGateway.emitSonosEvent(sonosEvent);
    }
}
