import {
    HttpModule,
    HttpService,
    Module,
    OnApplicationBootstrap,
    OnApplicationShutdown,
    OnModuleInit
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosRequestConfig } from 'axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEntity } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FibaroController } from './fibaro/fibaro.controller';
import { FibaroService } from './fibaro/fibaro.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { NestConfigService } from './services/nest-config.service';
import { NestConfigModule } from './services/nest-config/nest-config.module';
import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';
import { TelegramService } from './telegram/telegram.service';
import { NestWebsocketGateway } from './websocket/nest-websocket.gateway';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [NestConfigModule],
            useFactory: (nestConfigService: NestConfigService) => ({
                type: 'mysql',
                host: nestConfigService.mysqlHost,
                port: nestConfigService.mysqlPort,
                username: nestConfigService.mysqlUsername,
                password: nestConfigService.mysqlPassword,
                database: nestConfigService.mysqlDatabase,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true
            }),
            inject: [NestConfigService]
        }),
        TypeOrmModule.forFeature([EventEntity])
    ],
    controllers: [
        AppController,
        RoomsController,
        SonosController,
        FibaroController,
        EventsController
    ],
    providers: [
        AppService,
        EventsService,
        FibaroService,
        NestConfigService,
        NestWebsocketGateway,
        RoomsService,
        SonosService,
        TelegramService
    ]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private _nestConfigService: NestConfigService,
        private _httpService: HttpService,
        private _telegramService: TelegramService
    ) {}

    onModuleInit() {
        console.log(`\nNest AppModule started on http://${this._nestConfigService.host}:${this._nestConfigService.port}/`);
        console.log('AppModule.onModuleInit\n');

        this._httpService.axiosRef.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                console.log(config.url);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            });
    }

    onApplicationBootstrap() {
        this._telegramService.sendMessage('NestHome application started.').subscribe();
    }

    onApplicationShutdown(signal?: string) {
        console.log('AppModule.onApplicationShutdown', signal);
        this._telegramService.sendMessage('NestHome application stopped.').subscribe();
    }
}
