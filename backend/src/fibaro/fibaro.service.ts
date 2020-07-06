import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestConfigService } from '../services/nest-config.service';
import { IFibaroDevice } from './interfaces';
import { IFibaroDevices } from './interfaces/fibaroDevices.interface';
import { IFibaroRoom } from './interfaces/fibaroRoom.interface';
import { IFibaroRooms } from './interfaces/fibaroRooms.interface';

@Injectable()
export class FibaroService {

    private _fibaroApi: string;
    private _axiosRequestConfig: AxiosRequestConfig;

    constructor(
        private _httpService: HttpService,
        private _nestConfigService: NestConfigService
    ) {
        this._fibaroApi = this._nestConfigService.fibaro.api + '/';
        this._axiosRequestConfig = {
                auth: {
                    username: this._nestConfigService.fibaro.username,
                    password: this._nestConfigService.fibaro.password
                }
            };
    }

    public getDevices(): Observable<IFibaroDevices> {
        return this._httpService.get(this._fibaroApi + 'devices', this._axiosRequestConfig).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getDevice(id: number): Observable<IFibaroDevice> {
        return this._httpService.get(this._fibaroApi + `devices/${id}`, this._axiosRequestConfig).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRooms(): Observable<IFibaroRooms> {
        return this._httpService.get(this._fibaroApi + 'rooms', this._axiosRequestConfig).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoom(id: number): Observable<IFibaroRoom> {
        return this._httpService.get(this._fibaroApi + `room/${id}`, this._axiosRequestConfig).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }
}
