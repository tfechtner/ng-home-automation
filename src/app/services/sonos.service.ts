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

}
