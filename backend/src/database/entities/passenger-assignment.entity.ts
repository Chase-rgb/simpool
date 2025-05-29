import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Car } from './car.entity';
import { Event } from './event.entity';

@Entity()
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
