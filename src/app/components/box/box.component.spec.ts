import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BoxComponent } from './box.component';
import { SonosService } from '../../services/sonos/sonos.service';
import { SonosServiceMock } from '../../services/sonos/sonos.service.mock';

describe('BoxComponent', () => {
    let component: BoxComponent;
    let fixture: ComponentFixture<BoxComponent>;
    let testBedService: SonosService;
    let componentService: SonosService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoxComponent],
            imports: [HttpModule],
            providers: [SonosService],
        })
        .overrideComponent(
            BoxComponent,
            {set: {providers: [{provide: SonosService, useClass: SonosServiceMock}]}},
        )
        .compileComponents();

        testBedService = TestBed.get(SonosService);
        fixture = TestBed.createComponent(BoxComponent);
        fixture.debugElement.injector.get(SonosService);
        component = fixture.componentInstance;
        componentService = fixture.debugElement.injector.get(SonosService);
        component.ngOnInit();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
