import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class SonosServiceMock {

    constructor() {
    }

    getZones(): Observable<any> {
        const zones: object = {};
        return Observable.of(zones);
    }
}
