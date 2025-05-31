import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from 'src/database/entities/event.entity';
import { inspect } from 'util';

@Injectable()
export class EventsService {
  constructor(private dataSource: DataSource) {}

  async createEvent(
    createEventDto: CreateEventDto,
    user_id: number,
  ): Promise<Event> {
    const eventRepo = this.dataSource.getRepository(Event);
    const date = new Date(createEventDto.date);
    const expiration_date = new Date(date.setDate(date.getDate() + 1));

    const newEvent = await eventRepo.save({
      name: createEventDto.event_name,
      description: createEventDto.description,
      organizer: { user_id }, // This is how nest.js knows to associate `event` to pk of `user` useing user_id
      date: createEventDto.date,
      expiration_date: expiration_date,
    });

    console.log(inspect(newEvent, { depth: null }));
    return newEvent;
  }
}
