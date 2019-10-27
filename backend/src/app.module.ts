import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AxiosRequestConfig } from 'axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventSchema } from './events/event.schema';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { FibaroController } from './fibaro/fibaro.controller';
import { FibaroService } from './fibaro/fibaro.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forRoot('mongodb://localhost/nest', { useNewUrlParser: true }),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])
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
        console.log('AppModule.onModuleInit');
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
