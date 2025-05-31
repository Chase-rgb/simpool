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

  @OneToMany(() => Event, (event) => event.organizer, {
    onDelete: 'CASCADE',
  })
  events: Event[];

  @OneToMany(() => Car, (car) => car.driver, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.passenger)
  passenger_assignments: PassengerAssignment[];
}
