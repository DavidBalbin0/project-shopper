import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { driversSeed } from './data/drivers.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async onModuleInit() {
    const count = await this.driverRepository.count();
    if (count === 0) {
      console.log('Seeding initial drivers...');
      await this.driverRepository.save(driversSeed);
      console.log('Drivers seeded successfully!');
    } else {
      console.log('Drivers already exist in the database. Skipping seed.');
    }
  }
}
