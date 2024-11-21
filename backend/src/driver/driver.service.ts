import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './schemas/driver.schema';
import { AvailableDriver } from '../ride/models/Models';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>,

  ) {}

  async createDriver(driverData: Partial<Driver>): Promise<Driver> {
    const createdDriver = new this.driverModel(driverData);
    return createdDriver.save();
  }

  async getAllDrivers(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }
  async getAvailableDrivers(distanceInKm: number): Promise<AvailableDriver[]> {
    const drivers = await this.getAllDrivers();

    return drivers
      .filter((driver) => distanceInKm >= driver.minKm)
      .map((driver) => ({
        id: driver._id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.car,
        review: driver.review,
        value: parseFloat((distanceInKm * driver.ratePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value);
  }

  async getDriverById(driverId: string): Promise<Driver | null> {
    return this.driverModel.findById(driverId).exec();
  }

  async updateDriver(
    driverId: string,
    updateData: Partial<Driver>,
  ): Promise<Driver | null> {
    return this.driverModel
      .findByIdAndUpdate(driverId, updateData, { new: true })
      .exec();
  }

  async deleteDriver(driverId: string): Promise<Driver | null> {
    return this.driverModel.findByIdAndDelete(driverId).exec();
  }
}
