import { HttpModule, HttpService, Logger, Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosError, AxiosRequestConfig } from 'axios';
import * as packageJson from '../package.json';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CameraService } from './camera/camera.service';
import { DevicesController } from './devices/devices.controller';
import { DevicesService } from './devices/devices.service';
import { EventEntity } from './events/event.entity';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FibaroService } from './fibaro/fibaro.service';
import { RingService } from './ring/ring.service';
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
import { WebsocketGateway } from './websocket/nest-websocket.gateway';

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
        WebsocketGateway,
        RoomsService,
        ScraperService,
        SettingsService,
        SonosService,
        TasksService,
        TelegramService,
        DevicesService,
        RingService,
        CameraService,
        Logger
    ]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {

    constructor(
        private _nestConfigService: NestConfigService,
        private _httpService: HttpService,
        private _telegramService: TelegramService,
        private _cameraService: CameraService,
        private _ringService: RingService,
        private _logger: Logger
    ) {
        this._logger = new Logger('AppModule');
    }

    onModuleInit() {
        this._logger.log(`Backend started v${packageJson['version']} on http://${this._nestConfigService.host}:${this._nestConfigService.port}/`);

        this._ringService.init();

        this._httpService.axiosRef.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // this._logger.log('[Debug] Axios Request URL: ' + JSON.stringify(config));
                return config;
            },
            (axiosError: AxiosError) => {
                // this._logger.error('[Debug] Axios : ' + JSON.stringify(axiosError));
                return Promise.reject(axiosError);
            });
    }

    onApplicationBootstrap() {
        if (process.env.NODE_ENV === 'production') {
            this._logger.log('Application Bootstrap');
            this._telegramService.sendMessage(`Backend started v${packageJson['version']}`).subscribe();
        }
    }

    onApplicationShutdown(signal?: string) {
        this._logger.log('Application Shutdown', signal);
        if (process.env.NODE_ENV === 'production') {
            this._telegramService.sendMessage('Backend stopped.').subscribe();
        }
    }
}
