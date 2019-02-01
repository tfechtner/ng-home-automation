import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { isNullOrUndefined } from 'util';
import { CONFIG } from '../../config/main';

import { SonosStateAdapter } from '../../adaptors/sonos/sonos.adaptor';
import { SonosState } from '../../models/sonos/sonos.state';

@Injectable()
export class SonosService {

    private connected: boolean = null;
    private sonosState = new Subject<SonosState>();

    constructor(private http: HttpClient) {
        console.log('SonosService.constructor');
        this.updateState();
    }

    // Internals
    public getState(): Observable<SonosState> {
        return this.sonosState.asObservable();
    }
    public updateState() {
        console.log('SonosService.updateState');
        this.httpGetState()
            .subscribe(
                (stateData) => {
                    const sonosStateAdapter = new SonosStateAdapter(stateData);
                    this.sonosState.next(new SonosState( sonosStateAdapter.getJson() ));
                    this.connected = true;
                },
                error => {
                    this.connected = false;
                    console.log(error);
                },
                () => {
                    // setTimeout(() => {
                    //     this.updateState();
                    // }, 5000);
                });
    }

    // API
    public getZones(): Observable<object> {
        return this.httpGet(null, 'zones', null);
    }
    public httpGetState(): Observable<object> {
        return this.httpGet(null, 'state', null);
    }
    public getLockVolumes(): Observable<object> {
        return this.httpGet(null, 'lockvolumes', null);
    }
    public getUnLockVolumes(): Observable<object> {
        return this.httpGet(null, 'unlockvolumes', null);
    }
    public getPauseAll(timeout?: number): Observable<object> {
        return this.httpGet(null, 'pauseall', null);
    }
    public getResumeAll(timeout?: number): Observable<object> {
        return this.httpGet(null, 'resumeall', null);
    }

    // API Room
    public getRoomPlay(room: string): Observable<object> {
        return this.httpGet(room, 'play', null);
    }
    public getRoomPause(room: string): Observable<object> {
        return this.httpGet(room, 'pause', null);
    }
    public getRoomSleep(room: string, timeout: number|string = null): Observable<object> {
        // timeout in seconds (number) or "off" (string)
        return this.httpGet(room, 'sleep', timeout.toString());
    }
    public getRoomVolume(room: string, volume: number): Observable<object> {
        // volume 1 - 100
        return this.httpGet(room, 'volume', volume.toString());
    }
    public getRoomState(room: string): Observable<object> {
        return this.httpGet(room, 'state', null);
    }
    public getRoomFavourite(room: string, favourite: string): Observable<object> {
        return this.httpGet(room, 'favourite', favourite);
    }
    public getRoomSay(room: string, sentence: string, volume: number): Observable<object> {
        return this.httpGet(room, 'say', sentence, volume);
    }

    // General
    public isConnected(): boolean {
        return this.connected;
    }

    private httpGet(room: string, action: string, params: string, extra?: any): Observable<object> {
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
        if (isNullOrUndefined(extra) === false) {
            url += '/' + extra;
        }
        return this.http.get(url);
    }

}
