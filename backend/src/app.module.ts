import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';

import { AxiosRequestConfig } from 'axios';

import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './events/event.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';

import { SonosController } from './sonos/sonos.controller';
import { SonosService } from './sonos/sonos.service';

import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';

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
        EventsController
    ],
    providers: [
        AppService,
        RoomsService,
        SonosService,
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
