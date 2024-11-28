import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from '../entity/ride.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RideRepository {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) {}

  async saveRide(rideData: Partial<Ride>): Promise<Ride> {
    const ride = this.rideRepository.create(rideData);
    return this.rideRepository.save(ride);
  }
  async findRidesByFilters(
    customerId: number,
    driverId?: number,
    orderBy: string = 'created_at',
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Ride[]> {
    const query = this.rideRepository
      .createQueryBuilder('ride')
      .leftJoinAndSelect('ride.driver', 'driver')
      .where('ride.customer_id = :customerId', { customerId });

    if (driverId) {
      query.andWhere('ride.driver.id = :driverId', { driverId });
    }

    query.orderBy(`ride.${orderBy}`, orderDirection);

    return await query.getMany();
  }
}
