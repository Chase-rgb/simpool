import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Car } from 'src/cars/car.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event_name: string;
    
    @Column()
    date: Date;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.events)
    organizer: User;

    @OneToMany(() => Car, (car) => car.event)
    cars: Car[];

}

