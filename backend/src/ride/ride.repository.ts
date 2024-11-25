import { Injectable } from '@nestjs/common';
import { Ride } from './ride.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RideRepository {
  constructor(@InjectModel('Ride') private rideModel: Model<Ride>) {}

  async saveRide(rideData: Ride): Promise<Ride> {
    const createdRide = new this.rideModel(rideData);
    return createdRide.save();
  }
  async find(query: any): Promise<Ride[]> {
    return this.rideModel.find(query).exec();
  }
}
