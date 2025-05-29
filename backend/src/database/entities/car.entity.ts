import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { User } from 'src/database/entities/user.entity';
import { PassengerAssignment } from './passenger-assignment.entity';

@Entity()
@Unique(['event_id', 'driver_id']) // Ensures one person can only drive 1 car per event
export class Car {
  @PrimaryGeneratedColumn()
  car_id: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.car_id, {
    onDelete: 'CASCADE',
  })
  passenger_assignments: PassengerAssignment[];

  @ManyToOne(() => Event, (event) => event.cars, { onDelete: 'CASCADE' })
  event_id: Event;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: 'CASCADE' })
  driver_id: User;
}
