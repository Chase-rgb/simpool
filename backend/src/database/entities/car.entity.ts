import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { User } from 'src/database/entities/user.entity';
import { PassengerAssignment } from './passenger-assignment.entity';

@Entity()
@Unique(['event', 'driver']) // Ensures one person can only drive 1 car per event
export class Car {
  @PrimaryGeneratedColumn()
  car_id: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.car, {
    onDelete: 'CASCADE',
  })
  passenger_assignments: PassengerAssignment[];

  @ManyToOne(() => Event, (event) => event.cars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'event_uuid' })
  event: Event;

  @ManyToOne(() => User, (user) => user.cars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'driver_user_id' })
  driver: User;
}
