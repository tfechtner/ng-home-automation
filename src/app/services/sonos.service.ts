import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../config/main';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SonosService implements OnDestroy {

    private connected: boolean = null;
    private stateData: object = null;
    private stateSubscription: Subscription;

    constructor(private http: Http) {

        // TODO: SonosService - Add refresh to state
        let stateSubscription = this.getState()
            .subscribe((stateData: object) => {
                    this.stateData = stateData;
                    this.connected = true;
                },
                error => {
                    this.connected = false;
                    console.log(error);
                });
        this.stateSubscription = stateSubscription;

    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

    // API
    public getZones(): Observable<any> {
        return this.httpGet(null, 'zones', null);
    }
    public getState(): Observable<any> {
        return this.httpGet(null, 'state', null);
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

    // API Room
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

    // General
    public isConnected(): boolean {
        return this.connected;
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
