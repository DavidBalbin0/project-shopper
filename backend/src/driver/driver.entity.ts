import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ride } from '../ride/ride.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  car: string;

  @Column({ type: 'float', default: 0 })
  review: number;

    @Column({ nullable: true })
    comment: string;

  @Column({ type: 'float', default: 0 })
  ratePerKm: number;

  @Column({ type: 'float', default: 0 })
  minKm: number;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];
}
