import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestConfigService } from '../nest-config.service';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        NestConfigService
    ],
    exports: [
        NestConfigService
    ]
})
export class NestConfigModule { }
