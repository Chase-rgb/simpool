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
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: 'db',
                port: configService.getOrThrow('POSTGRES_PORT'),
                username: configService.getOrThrow('POSTGRES_USER'),
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                database: configService.getOrThrow('POSTGRES_DB'),
                entities: [User, Event, Car],
                synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
