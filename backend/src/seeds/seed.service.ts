import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from '../driver/schemas/driver.schema';
import { driversSeed } from './data/drivers.seed';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>,
  ) {}

  async onModuleInit() {
    const count = await this.driverModel.estimatedDocumentCount();
    if (count === 0) {
      console.log('Seeding initial drivers...');
      await this.driverModel.insertMany(driversSeed);
      console.log('Drivers seeded successfully!');
    } else {
      console.log('Drivers already exist in the database. Skipping seed.');
    }
  }
}
