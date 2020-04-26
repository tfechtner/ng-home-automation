import { TestBed } from '@angular/core/testing';

import { NestService } from './nest.service';

describe('NestJsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NestService = TestBed.get(NestService);
        expect(service).toBeTruthy();
    });
});
