import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceTypes } from '@backend/devices/models/device';
import { IFibaroDevice } from '@backend/fibaro/interfaces/fibaroDevice.interface';
import { IFibaroRoom } from '@backend/fibaro/interfaces/fibaroRoom.interface';
import { IFibaroRooms } from '@backend/fibaro/interfaces/fibaroRooms.interface';
import { SettingDto } from '@backend/settings/dto/setting.dto';
import { SettingHouseModeEnum } from '@backend/settings/enums/settingHouseModes.enum';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config/main';

@Injectable()
export class NestService {
    private apiUrl = CONFIG.API.nest;

    constructor(
        private http: HttpClient
    ) { }

    public getApiState(): Observable<any> {
        return this.http.get(this.apiUrl + '/state');
    }

    public getDevices(): Observable<DeviceTypes[]> {
        return this.http.get<DeviceTypes[]>(this.apiUrl + '/devices');
    }

    public getRooms(): Observable<any> {
        return this.http.get(this.apiUrl + '/rooms');
    }

    public getEvents(): Observable<any> {
        return this.http.get(this.apiUrl + '/events');
    }

    // Sonos

    public getSonosZones(): Observable<any> {
        return this.http.get(this.apiUrl + '/sonos/zones');
    }

    public getSonosRoomState(room: string): Observable<any> {
        return this.http.get(this.apiUrl + `/sonos/${room}`);
    }

    public getSonosRoomPlay(room: string): Observable<any> {
        return this.http.get(this.apiUrl + `/sonos/${room}/play`);
    }

    public getSonosRoomPause(room: string): Observable<any> {
        return this.http.get(this.apiUrl + `/sonos/${room}/pause`);
    }

    public getSonosRoomVolume(room: string, volume: number): Observable<any> {
        return this.http.get(this.apiUrl + `/sonos/${room}/volume/${volume}`);
    }

    public getSonosRoomMute(room: string, mute: boolean): Observable<any> {
        const status = mute ? 'mute' : 'unmute';
        return this.http.get(this.apiUrl + `/sonos/${room}/${status}`);
    }

    public getSonosRoomFavourites(): Observable<string[]> {
        return this.http.get<string[]>(this.apiUrl + `/sonos/favourites`);
    }

    public getSonosRoomFavourite(room: string, favourite: string): Observable<any> {
        return this.http.get(this.apiUrl + `/sonos/${room}/favourite/${favourite}`);
    }

    // Fibaro

    public getFibaroDevices(): Observable<IFibaroDevice[]> {
        return this.http.get<IFibaroDevice[]>(this.apiUrl + '/fibaro/devices');
    }

    public getFibaroDevice(id: number): Observable<IFibaroDevice> {
        return this.http.get<IFibaroDevice>(this.apiUrl + `/fibaro/devices/${id}`);
    }

    public getFibaroRooms(): Observable<IFibaroRooms> {
        return this.http.get<IFibaroRooms>(this.apiUrl + '/fibaro/rooms');
    }

    public getFibaroRoom(id: number): Observable<IFibaroRoom> {
        return this.http.get<IFibaroRoom>(this.apiUrl + `/fibaro/rooms/${id}`);
    }

    // Settings

    public getSettings(): Observable<SettingDto[]> {
        return this.http.get<SettingDto[]>(this.apiUrl + `/settings`);
    }

    public setHouseMode(houseMode: SettingHouseModeEnum): Observable<SettingDto> {
        return this.http.get<SettingDto>(this.apiUrl + `/settings/set-house-mode/${houseMode}`);
    }
}
