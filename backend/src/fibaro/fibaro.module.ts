import { Module } from '@nestjs/common';
import { FibaroController } from './fibaro.controller';
import { FibaroService } from './fibaro.service';

@Module({
    controllers: [FibaroController],
    providers: [FibaroService]
})
export class FibaroModule {
}
