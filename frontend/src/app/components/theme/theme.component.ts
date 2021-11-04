import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit, OnDestroy {

    public themes = [
        {
            value: 'default',
            name: 'Light'
        },
        {
            value: 'dark',
            name: 'Dark'
        },
        {
            value: 'cosmic',
            name: 'Cosmic'
        },
        {
            value: 'corporate',
            name: 'Corporate'
        }
    ];

    public currentTheme = 'default';

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        // private _store: Store,
        private _themeService: NbThemeService
    ) { }

    public ngOnInit() {
        this.currentTheme = this._themeService.currentTheme;

        this._themeService.onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this._destroyed$)
            ).subscribe(themeName => this.currentTheme = themeName);
    }

    public ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    public changeTheme(themeValue: string) {
        this._themeService.changeTheme(themeValue);
    }

}
