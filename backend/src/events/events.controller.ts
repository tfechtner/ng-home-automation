import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventEntity } from './event.entity';

@Controller('events')
export class EventsController {
    constructor(
        private readonly _eventsService: EventsService
    ) {}

    @Get('events/state')
    getState(): object {
        return {
            data: 'me'
        };
    }

    @Get()
    index(): Promise<EventEntity[]> {
        return this._eventsService.findAll();
    }

    @Post('create')
    async create(@Body() eventData: EventEntity): Promise<any> {
        return this._eventsService.create(eventData);
    }
}
