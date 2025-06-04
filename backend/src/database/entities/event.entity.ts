import { Car } from 'src/database/entities/car.entity';
import { User } from 'src/database/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PassengerAssignment } from './passenger-assignment.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column({ type: 'uuid', unique: true, default: () => 'gen_random_uuid()' })
  event_uuid: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  expiration_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizer_user_id' }) // This is setting up a column that maps val of this column to user through the primary key defined in events.service
  organizer: User;

  @OneToMany(() => Car, (car) => car.driver, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToMany(() => PassengerAssignment, (assignment) => assignment.event, {
    onDelete: 'CASCADE',
  })
  passenger_assignments: PassengerAssignment[];
}
