import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>
    ) {}

    async findAll(): Promise<EventEntity[]> {
        return await this.eventRepository.find();
    }

    async create(event: EventEntity): Promise<EventEntity> {
        return await this.eventRepository.save(event);
    }
}
