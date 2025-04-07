import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Event } from '../events/event.entity';
import { Car } from '../cars/car.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => Event, (event) => event.organizer)
    events: Event[];

    @OneToMany(() => Car, (car) => car.driver)
    cars_as_driver: Car[];

    @ManyToMany(() => Car, (car) => car.passengers)
    cars_as_passenger: Car[];
}