import { Controller, Get, Param } from '@nestjs/common';
import { SonosService } from './sonos.service';

@Controller('sonos')
export class SonosController {
    constructor(
        private readonly _sonosService: SonosService
    ) {}

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
}
