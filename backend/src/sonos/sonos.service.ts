import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestConfigService } from '../services/nest-config.service';
import { ISonosCoordinatorState } from './dto/sonosCoordinatorState.dto';
import { sonosDtoDefaults, ISonosDto } from './dto/sonosDevice.interface';

@Injectable()
export class SonosService {

    private _sonosApi: string;

    constructor(
        private httpService: HttpService,
        private _nestConfigService: NestConfigService
    ) {
        this._sonosApi = this._nestConfigService.sonosApi;
    }

    public getZones(): Observable<any> {
        return this.httpService.get(this._sonosApi + 'zones').pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomState(room: string): Observable<ISonosDto> {
        return this.httpService.get(this._sonosApi + `${room}/state`).pipe(
            map((axiosResponse: AxiosResponse<ISonosCoordinatorState>) => this._mapSonosDevice(room, axiosResponse.data))
        );
    }

    public getRoomPlay(room: string): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/play`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomPause(room: string): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/pause`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomNext(room: string): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/next`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomPrevious(room: string): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/previous`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomVolume(room: string, volume: number): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/volume/${volume}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomMute(room: string, mute: boolean): Observable<any> {
        const status = mute ? 'mute' : 'unmute';
        return this.httpService.get(this._sonosApi + `${room}/${status}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getFavourites(): Observable<any> {
        return this.httpService.get(this._sonosApi + `favourites`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    public getRoomFavourite(room: string, favourite: string): Observable<any> {
        return this.httpService.get(this._sonosApi + `${room}/favourite/${favourite}`).pipe(
            map(axiosResponse => {
                return axiosResponse.data;
            })
        );
    }

    private _mapSonosDevice(room: string, data: ISonosCoordinatorState): ISonosDto {
        return {
            ...sonosDtoDefaults,
            roomName: room,
            volume: data.volume,
            playbackState: data.playbackState
        };
    }
}
