import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SonosService } from './page.service';

describe('SonosService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [SonosService],
        });
    });

    it('should be created', inject([SonosService], (service: SonosService) => {
        expect(service).toBeTruthy();
    }));
});
