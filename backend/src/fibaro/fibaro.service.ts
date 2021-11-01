import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestConfigService } from '../services/nest-config.service';
import { fibaroDtoDefaults, IFibaroDevice, IFibaroDto } from './interfaces';
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

    public getDevices(): Observable<IFibaroDto[]> {
        return this._httpService.get(this._fibaroApi + 'devices', this._axiosRequestConfig).pipe(
            map((axiosResponse: AxiosResponse<IFibaroDevice[]>) => {
                return axiosResponse.data.map(fibaroDevice => this._mapFibaroDevice(fibaroDevice));
            })
        );
    }

    public getDevice(id: number): Observable<IFibaroDto> {
        return this._httpService.get(this._fibaroApi + `devices/${id}`, this._axiosRequestConfig).pipe(
            map((axiosResponse: AxiosResponse<IFibaroDevice>) => this._mapFibaroDevice(axiosResponse.data))
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

    private _mapFibaroDevice(data: IFibaroDevice): IFibaroDto {
        const device = this._assignProperties({ ...fibaroDtoDefaults }, data);
        return {
            ...device,
            properties: {
                ...device.properties,
                batteryLevel: +device.properties.batteryLevel
            }
        };
    }

    private _assignProperties(obj: object, data: object): any {
        Object.keys(obj).forEach(prop => {
            if (prop in obj) {
                if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop]) && obj[prop] !== null) {
                    obj[prop] = this._assignProperties(obj[prop], data[prop]);
                } else {
                    obj[prop] = data[prop];
                }
            }
        });
        return { ...obj };
    }
}
