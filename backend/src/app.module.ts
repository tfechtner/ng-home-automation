import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FibaroController } from './fibaro/fibaro.controller';
import { FibaroService } from './fibaro/fibaro.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './events/event.entity';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'nest',
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
        EventsService
    ]
})
export class AppModule implements OnModuleInit {
    constructor(
        private httpService: HttpService
    ) {}

    onModuleInit() {
        console.log('\nNest AppModule started on http://localhost:3000/');
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
}
