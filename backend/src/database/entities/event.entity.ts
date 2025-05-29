import { Car } from 'src/database/entities/car.entity';
import { User } from 'src/database/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PassengerAssignment } from './passenger-assignment.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  expiration_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  organizer_id: User;

  @OneToMany(() => Car, (car) => car.driver_id, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.event_id, {
    onDelete: 'CASCADE',
  })
  passenger_assignments: PassengerAssignment[];
}
