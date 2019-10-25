import { Module } from '@nestjs/common';
import { SonosService } from './sonos.service';
import { SonosController } from './sonos.controller';

@Module({
    controllers: [
        SonosController,
    ],
    providers: [
        SonosService,
    ],
    exports: [
        SonosService,
    ],
})
export class SonosModule {
}
