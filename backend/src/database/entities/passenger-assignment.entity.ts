import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Car } from './car.entity';
import { Event } from './event.entity';

@Entity()
@Unique(['passenger', 'event']) // Ensure a user can only be assigned to one car per event
export class PassengerAssignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @ManyToOne(() => User, (user) => user.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passenger_user_id' })
  passenger: User;

  @ManyToOne(() => Car, (car) => car.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => Event, (event) => event.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
