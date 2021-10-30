import { Module } from '@nestjs/common';
import { FibaroService } from './fibaro.service';

@Module({
    providers: [FibaroService]
})
export class FibaroModule {
}
