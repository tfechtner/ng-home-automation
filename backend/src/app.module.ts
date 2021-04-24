import { HttpModule, HttpService, Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosError, AxiosRequestConfig } from 'axios';
import * as packageJson from '../package.json';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesController } from './devices/devices.controller';
import { DevicesService } from './devices/devices.service';
import { EventEntity } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FibaroController } from './fibaro/fibaro.controller';
import { FibaroService } from './fibaro/fibaro.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { NestConfigService } from './services/nest-config.service';
import { NestConfigModule } from './services/nest-config/nest-config.module';
import { ScraperService } from './services/scraper.service';
import { TasksService } from './services/tasks.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsEntity } from './settings/settings.entity';
import { SettingsService } from './settings/settings.service';
import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';
import { TelegramController } from './telegram/telegram.controller';
import { TelegramService } from './telegram/telegram.service';
import { NestWebsocketGateway } from './websocket/nest-websocket.gateway';

const envFilePath = process.env.NODE_ENV === 'production' ? './backend/.env' : '.env';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({ envFilePath }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                NestConfigModule
            ],
            useFactory: (nestConfigService: NestConfigService) => ({
                type: 'mysql',
                host: nestConfigService.mysql.host,
                port: nestConfigService.mysql.port,
                username: nestConfigService.mysql.username,
                password: nestConfigService.mysql.password,
                database: nestConfigService.mysql.database,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true
            }),
            inject: [
                NestConfigService
            ]
        }),
        TypeOrmModule.forFeature([
            EventEntity,
            SettingsEntity
        ])
    ],
    controllers: [
        AppController,
        RoomsController,
        SonosController,
        FibaroController,
        EventsController,
        DevicesController,
        SettingsController,
        TelegramController
    ],
    providers: [
        AppService,
        EventsService,
        FibaroService,
        NestConfigService,
        NestWebsocketGateway,
        RoomsService,
        ScraperService,
        SettingsService,
        SonosService,
        TasksService,
        TelegramService,
        DevicesService
    ]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private _nestConfigService: NestConfigService,
        private _httpService: HttpService,
        private _telegramService: TelegramService
    ) {}

    onModuleInit() {
        console.log(`\n[ AppModule ] Backend started v${packageJson['version']} on http://${this._nestConfigService.host}:${this._nestConfigService.port}/`);

        this._httpService.axiosRef.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // console.log('[ Debug ] Axios Request URL: ', config.url);
                return config;
            },
            (axiosError: AxiosError) => {
                return Promise.reject(axiosError);
            });
    }

    onApplicationBootstrap() {
        // if (environment.production) {
        console.log('[ AppModule ] Application Bootstrap');
        this._telegramService.sendMessage(`Backend started v${packageJson['version']}`).subscribe();
        // }
    }

    onApplicationShutdown(signal?: string) {
        console.log('[ AppModule ] Application Shutdown', signal);
        // if (environment.production) {
        this._telegramService.sendMessage('Backend stopped.').subscribe();
        // }
    }
}
