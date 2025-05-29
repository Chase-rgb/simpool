import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Car } from './car.entity';
import { Event } from './event.entity';

@Entity()
@Unique(['passenger_id', 'event_id']) // Ensure a user can only be assigned to one car per event
export class PassengerAssignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @ManyToOne(() => User, (user) => user.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  passenger_id: User;

  @ManyToOne(() => Car, (car) => car.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  car_id: Car;

  @ManyToOne(() => Event, (event) => event.passenger_assignments, {
    onDelete: 'CASCADE',
  })
  event_id: Event;
}
