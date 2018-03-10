import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageService} from '../../services/page/page.service';
import {SonosService} from '../../services/sonos/sonos.service';
import {SonosServiceMock} from '../../services/sonos/sonos.service.mock';

import {TopNavComponent} from './top-nav.component';

describe('TopNavComponent', () => {
    let component: TopNavComponent;
    let fixture: ComponentFixture<TopNavComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [TopNavComponent],
            providers: [
                PageService,
                {provide: SonosService, useClass: SonosServiceMock},
            ]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
