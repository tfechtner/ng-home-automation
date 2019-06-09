import { TestBed } from '@angular/core/testing';

import { NestJsService } from './nestJs.service';

describe('NestJsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NestJsService = TestBed.get(NestJsService);
        expect(service).toBeTruthy();
    });
});
