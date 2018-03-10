import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PageService } from './page.service';

describe('SonosService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [PageService],
        });
    });

    it('should be created', inject([PageService], (service: PageService) => {
        expect(service).toBeTruthy();
    }));
});
