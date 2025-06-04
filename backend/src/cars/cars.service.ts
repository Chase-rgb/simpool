import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from 'src/database/entities/car.entity';
import { parse as uuidParse } from 'uuid'; // Using uuidParse to parse the event_uuid

@Injectable()
export class CarsService {
  constructor(private dataSource: DataSource) {}

  async createCar(createCarDto: CreateCarDto, user_id: number): Promise<Car> {
    const carRepo = this.dataSource.getRepository(Car);
    try {
      return await carRepo.save({
        description: createCarDto.description,
        driver: { user_id: user_id }, // This associates the car with the driver using user_id
        event: { event_uuid: createCarDto.event_uuid }, // This associates the car with the event using event_uuid
      });
    } catch (error) {
      // If database detects a unique constraint violation, it will throw an error
      if (error.code === '23505') {
        console.error('Unique constraint violation:', error);
      } else {
        console.error('Database error:', error);
        throw error;
      }
    }
    throw new InternalServerErrorException('Car creation failed');
  }
}
