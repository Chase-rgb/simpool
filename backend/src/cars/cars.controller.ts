import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from 'src/database/entities/car.entity';

@ApiBearerAuth()
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createCar')
  async createCar(
    @Request() requestAnimationFrame,
    @Body() createCarDto: CreateCarDto,
  ): Promise<Car> {
    return await this.carsService.createCar(
      createCarDto,
      requestAnimationFrame.user.user_id,
    );
  }
}
