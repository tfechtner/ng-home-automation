import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIG } from '../../config/main';

@Injectable()
export class NestService {
    private apiUrl = CONFIG.API.nest;

    constructor(
        private http: HttpClient
    ) {
    }

    public getApiState(): Observable<any> {
        return this.http.get(this.apiUrl + '/state');
    }

    public getSonosZones(): Observable<any> {
        return this.http.get(this.apiUrl + '/sonos/zones');
    }

    public getRooms(): Observable<any> {
        return this.http.get(this.apiUrl + '/rooms');
    }
}
