import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FibaroService } from './fibaro.service';
import { IFibaroDevice, IFibaroDevices } from './interfaces';
import { IFibaroRoom } from './interfaces/fibaroRoom.interface';
import { IFibaroRooms } from './interfaces/fibaroRooms.interface';

@Controller('fibaro')
export class FibaroController {
    constructor(
        private readonly _fibaroService: FibaroService
    ) {}

    @Get('devices')
    getDevices(): Observable<IFibaroDevices> {
        return this._fibaroService.getDevices();
    }

    @Get('devices/:id')
    getDevice(
        @Param('id') id: number
    ): Observable<IFibaroDevice> {
        return this._fibaroService.getDevice(id);
    }

    @Get('rooms')
    getRooms(): Observable<IFibaroRooms> {
        return this._fibaroService.getRooms();
    }

    @Get('rooms/:id')
    getRoom(
        @Param('id') id: number
    ): Observable<IFibaroRoom> {
        return this._fibaroService.getRoom(id);
    }
}
