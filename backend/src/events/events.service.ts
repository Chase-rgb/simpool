import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from 'src/database/entities/event.entity';
import { v4 as uuidv4 } from 'uuid';

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
    const maxRetries = 3;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const newEvent = eventRepo.create({
          name: createEventDto.event_name,
          description: createEventDto.description,
          organizer: { user_id }, // This is how nest.js knows to associate `event` to pk of `user` useing user_id
          date: createEventDto.date,
          expiration_date: expiration_date,
          event_uuid: uuidv4(),
        });

        return eventRepo.save(newEvent);
      } catch (error) {
        if (error.code === '23505') {
          console.error(`Attempt ${attempt + 1} failed:`, error);
        } else {
          throw error;
        }
      }
    }
    throw new InternalServerErrorException('Event creation failed');
  }
}
