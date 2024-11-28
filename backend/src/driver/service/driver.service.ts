import { Injectable } from '@nestjs/common';

import { AvailableDriver } from '../../ride/interface/Interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entity/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async getAvailableDrivers(distanceInKm: number): Promise<AvailableDriver[]> {
    const drivers = await this.findAll();

    return drivers
      .filter((driver) => distanceInKm >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: {
          rating: driver.review,
          comment: driver.comment,
        },
        value: parseFloat((distanceInKm * driver.ratePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value);
  }

  async getDriverById(driverId: number): Promise<Driver | null> {
    return this.driverRepository.findOne({
      where: { id: driverId },
    });
  }

  async validateDriver(id: number): Promise<Driver | null> {
    return this.getDriverById(id);
  }
}
