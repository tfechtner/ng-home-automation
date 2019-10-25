import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.interface';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {}

    async create(createCatDto: CreateEventDto): Promise<Event> {
        const createdCat = new this.eventModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<Event[]> {
        return await this.eventModel.find().exec();
    }
}
