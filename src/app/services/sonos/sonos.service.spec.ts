import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SonosService } from './sonos.service';
import { SonosServiceMock } from './sonos.service.mock';

describe('SonosService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{provide: SonosService, useClass : SonosServiceMock }],
        });
    });

    it('should be created', inject([SonosService], (service: SonosService) => {
        expect(service).toBeTruthy();
    }));
});
