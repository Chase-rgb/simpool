import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { Car } from './car.entity';
import { PassengerAssignment } from './passenger-assignment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.organizer_id, {
    onDelete: 'CASCADE',
  })
  events: Event[];

  @OneToMany(() => Car, (car) => car.driver_id, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.passenger_id)
  passenger_assignments: PassengerAssignment[];
}
