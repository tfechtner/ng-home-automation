import { Controller, Get, Param } from '@nestjs/common';
import { Room } from './models/room/room';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private roomsService: RoomsService
    ) {}

    @Get()
    getRooms() {
        return this.roomsService.rooms;
    }

    @Get(':id')
    getRoom(@Param('id') id: string): Room {
        return this.roomsService.getRoom(parseInt(id, 10));
    }
}
