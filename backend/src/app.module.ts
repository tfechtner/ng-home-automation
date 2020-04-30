import {
    HttpModule,
    HttpService,
    Module,
    OnApplicationBootstrap,
    OnApplicationShutdown,
    OnModuleInit
} from '@nestjs/common';
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
import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';
import { TelegramService } from './telegram/telegram.service';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'nest',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
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
        RoomsService,
        SonosService,
        FibaroService,
        EventsService,
        TelegramService
    ]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private httpService: HttpService,
        private telegramService: TelegramService
    ) {}

    onModuleInit() {
        console.log('\nNest AppModule started on http://192.168.0.44:3000/');
        console.log('AppModule.onModuleInit\n');

        this.httpService.axiosRef.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                console.log(config.url);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            });
    }

    onApplicationBootstrap() {
        this.telegramService.sendMessage('NestHome application started.').subscribe();
    }

    onApplicationShutdown(signal?: string) {
        console.log('AppModule.onApplicationShutdown', signal);
        this.telegramService.sendMessage('NestHome application stopped.').subscribe();
    }
}
