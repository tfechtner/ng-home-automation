import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
