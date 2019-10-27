import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FibaroService } from './fibaro.service';
import { IFibaroDevice, IFibaroDevices } from './interfaces';

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
}
