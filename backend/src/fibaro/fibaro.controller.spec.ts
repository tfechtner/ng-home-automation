import { Test, TestingModule } from '@nestjs/testing';
import { FibaroController } from './fibaro.controller';

describe('Fibaro Controller', () => {
    let controller: FibaroController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FibaroController],
        }).compile();

        controller = module.get<FibaroController>(FibaroController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
