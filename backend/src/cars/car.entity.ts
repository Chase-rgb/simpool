import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Event } from 'src/events/event.entity';
import { User } from 'src/users/user.entity';
@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.cars, { onDelete: 'CASCADE' })
  event: Event;

  @ManyToOne(() => User, (user) => user.cars_as_driver, { onDelete: 'CASCADE' })
  driver: User;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.cars_as_passenger)
  @JoinTable()
  passengers: User[];
}
