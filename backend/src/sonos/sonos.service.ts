import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CONFIG } from '../config/main';

import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockData } from './sonos.mock';

@Injectable()
export class SonosService {
    constructor(
        private httpService: HttpService
    ) {
        // const mock = new MockAdapter(Axios);
        // mock.onGet(CONFIG.API.sonos + 'zones').reply(200, mockData);
    }

    public getZones(): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + 'zones').pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomState(room: string): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `${room}/state`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomPlay(room: string): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `${room}/play`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomPause(room: string): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `${room}/pause`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomVolume(room: string, volume: number): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `${room}/volume/${volume}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomMute(room: string, mute: boolean): Observable<any> {
        const status = mute ? 'mute' : 'unmute';
        return this.httpService.get(CONFIG.API.sonos + `${room}/${status}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getFavourites(): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `favourites`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomFavourite(room: string, favourite: string): Observable<any> {
        return this.httpService.get(CONFIG.API.sonos + `${room}/favourite/${favourite}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }
}
