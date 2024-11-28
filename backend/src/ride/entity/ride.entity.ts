import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Driver } from '../../driver/entity/driver.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
