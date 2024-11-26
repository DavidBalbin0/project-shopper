import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column('float')
  distance: number;

  @Column()
  duration: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;
}
