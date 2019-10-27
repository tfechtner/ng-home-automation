import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG } from '../config/main';
import { IFibaroDevice } from './interfaces';
import { IFibaroDevices } from './interfaces/fibaroDevices.interface';

@Injectable()
export class FibaroService {

    private config: AxiosRequestConfig = {
        auth: {
            username: 'tom.fechtner@gmail.com',
            password: 'cseF9viBCCk7'
        }
    };

    constructor(
        private httpService: HttpService
    ) {}

    public getDevices(): Observable<IFibaroDevices> {
        return this.httpService.get(CONFIG.API.fibaro + 'devices', this.config).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getDevice(id: number): Observable<IFibaroDevice> {
        return this.httpService.get(CONFIG.API.fibaro + `devices/${id}`, this.config).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }
}
