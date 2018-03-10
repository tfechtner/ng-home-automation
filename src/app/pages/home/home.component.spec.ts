import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PageService } from '../../services/page/page.service';
import { SonosService } from '../../services/sonos/sonos.service';

import { HomeComponent } from './home.component';
import { BoxComponent } from '../../components/box/box.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                BoxComponent
            ],
            imports: [HttpModule],
            providers: [
                PageService,
                SonosService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
