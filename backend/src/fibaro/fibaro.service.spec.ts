import { Test, TestingModule } from '@nestjs/testing';
import { FibaroService } from './fibaro.service';

describe('FibaroService', () => {
    let service: FibaroService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FibaroService],
        }).compile();

        service = module.get<FibaroService>(FibaroService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
