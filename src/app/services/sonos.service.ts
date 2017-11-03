import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../config/main';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SonosService {

    constructor(private http: Http) {
    }

    // Global
    public getZones(): Observable<any> {
        return this.httpGet(null, 'zones', null);
    }
    public getLockVolumes(): Observable<any> {
        return this.httpGet(null, 'lockvolumes', null);
    }
    public getUnLockVolumes(): Observable<any> {
        return this.httpGet(null, 'unlockvolumes', null);
    }
    public getPauseAll(timeout?: number): Observable<any> {
        return this.httpGet(null, 'pauseall', null);
    }
    public getResumeAll(timeout?: number): Observable<any> {
        return this.httpGet(null, 'resumeall', null);
    }

    // Room
    public getRoomPlay(room: string): Observable<any> {
        return this.httpGet(room, 'play', null);
    }
    public getRoomPause(room: string): Observable<any> {
        return this.httpGet(room, 'pause', null);
    }
    public getRoomSleep(room: string, timeout: number|string = null): Observable<any> {
        // timeout in seconds (number) or "off" (string)
        return this.httpGet(room, 'sleep', timeout.toString());
    }
    public getRoomVolume(room: string, volume: number): Observable<any> {
        // volume 1 - 100
        return this.httpGet(room, 'volume', volume.toString());
    }
    public getRoomState(room: string): Observable<any> {
        return this.httpGet(room, 'state', null);
    }

    private httpGet(room: string, action: string, params: string): Observable<any> {
        let url = CONFIG.API.sonos;

        if (isNullOrUndefined(room) === false) {
            url += '/' + room;
        }
        if (isNullOrUndefined(action) === false) {
            url += '/' + action;
        }
        if (isNullOrUndefined(params) === false) {
            url += '/' + params;
        }
        return this.http.get(url);
    }

}
