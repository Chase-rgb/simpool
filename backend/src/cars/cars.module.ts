import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
