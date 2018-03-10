import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PageService {

    private title = new Subject<string>();

    constructor() {
    }

    public setPageTitle(title: string) {
        this.title.next(title);
    }

    public getPageTitle(): Observable<string> {
        return this.title.asObservable();
    }

}
