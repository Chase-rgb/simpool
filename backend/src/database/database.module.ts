/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/car.entity';
import { User } from 'src/users/user.entity';
import { Event } from 'src/events/event.entity';

@Module({
  imports: [
    // This is what is actually used to connect to the database
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isDocker = configService.getOrThrow("NODE_ENV") === "docker";
        
        return {
          type: 'postgres',
          host: isDocker ? configService.getOrThrow('DOCKER_POSTGRES_HOST') : configService.getOrThrow('LOCAL_POSTGRES_HOST'),
          port: configService.getOrThrow('POSTGRES_PORT'),
          username: configService.getOrThrow('POSTGRES_USER'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          database: configService.getOrThrow('POSTGRES_DB'),
          autoLoadEntities: true,
          entities: [User, Event, Car],
          synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
        };
      }, 
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
