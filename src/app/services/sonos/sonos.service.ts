import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isNullOrUndefined } from 'util';
import { CONFIG } from '../../config/main';

export interface ISonosRoomStateJson {
    volume: number;
    mute: boolean;
    equalizer: { 
        bass: number;
        treble: number;
        loudness: boolean;
    };
    currentTrack: {
        artist: string;
        title: string;
        albumArtUri: string;
        duration: number;
        uri: string;
        trackUri: string;
        type: string;
        stationName: string;
        absoluteAlbumArtUri: string;
    };
    nextTrack: {
        artist: string;
        title: string;
        album: string;
        albumArtUri: string;
        duration: number;
        uri: string;
    };
    trackNo: number;
    elapsedTime: number;
    elapsedTimeFormatted: string;
    playbackState: string;
    playMode: {
        repeat: string;
        shuffle: false;
        crossfade: false;
    };
}

@Injectable()
export class SonosService {

    private connected: boolean = null;

    constructor(
        private http: HttpClient
    ) {}

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
    public getRoomState(room: string): Observable<ISonosRoomStateJson> {
        return this.httpGet<ISonosRoomStateJson>(room, 'state', null);
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

    private httpGet<T>(room: string, action: string, params: string, extra?: any): Observable<T> {
        let url = '';

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
        return this.http.get<T>(url);
    }

}
