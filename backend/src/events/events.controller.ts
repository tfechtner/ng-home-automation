import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './create-event.dto';

@Controller()
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

    @Get('events')
    async findAll(@Res() res): Promise<Event[]> {
        const events = await this._eventsService.findAll();
        return res.status(HttpStatus.OK).json(events);
    }

    @Post('events/create')
    async create(@Res() res, @Body() createCatDto: CreateEventDto) {
        const newEvent = await this._eventsService.create(createCatDto);
        return res.status(HttpStatus.OK).json({
            message: 'Event has been submitted successfully!',
            post: newEvent
        });
    }
}
