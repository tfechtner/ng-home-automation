import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageService } from './services/page/page.service';
import { SonosService } from './services/sonos/sonos.service';
import { SonosServiceMock } from './services/sonos/sonos.service.mock';

import { AppComponent } from './app.component';
import { BoxComponent } from './components/box/box.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                SideNavComponent,
                TopNavComponent,
                BoxComponent
            ],
            providers: [
                PageService,
                {provide: SonosService, useClass: SonosServiceMock},
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
