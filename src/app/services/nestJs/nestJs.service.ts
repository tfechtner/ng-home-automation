import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIG } from '../../config/main';

@Injectable()
export class NestJsService {
    private apiUrl = CONFIG.API.nestJs;

    constructor(
        private http: HttpClient
    ) {
    }

    public getApiState(): Observable<object> {
        return this.http.get(this.apiUrl + '/state');
    }

    public getRooms(): Observable<object> {
        return this.http.get(this.apiUrl + '/rooms');
    }
}
