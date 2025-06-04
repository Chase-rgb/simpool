import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from 'src/database/entities/event.entity';

@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createEvent')
  async createEvent(
    @Request() req,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    return await this.eventsService.createEvent(
      createEventDto,
      req.user.user_id,
    );
  }
}
