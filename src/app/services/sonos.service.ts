import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CONFIG } from '../config/main';

@Injectable()
export class SonosService {

    constructor(private http: Http) {
    }

    public getZones() {

        return this.http.get(CONFIG.API.sonos + 'zones')
            .map((response: Response) => {
                console.log('getZones', response);
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRoomPause(room) {

        return this.http.get(CONFIG.API.sonos + room + '/pause')
            .map((response: Response) => {
                console.log('getRoomPause', response);
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

}
