import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './ride.entity';
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
  ): Promise<Ride[]> {
    const queryBuilder = this.rideRepository.createQueryBuilder('ride');

    queryBuilder.where('ride.customer_id = :customerId', { customerId });

    if (driverId) {
      queryBuilder.andWhere('ride.driverId = :driverId', { driverId });
    }

    // Carregar informações do driver
    queryBuilder.leftJoinAndSelect('ride.driver', 'driver');

    return queryBuilder.getMany();
  }
}
