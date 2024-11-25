import { Module } from '@nestjs/common';
import { RideService } from './service/ride.service';
import { RideController } from './controller/ride.controller';
import { DriverModule } from '../driver/driver.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RideRepository } from './ride.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RideSchema } from './ride.schema';
@Module({
  imports: [
    DriverModule,
    ConfigModule,
    HttpModule,
    MongooseModule.forFeature([{ name: 'Ride', schema: RideSchema }]),
  ],
  providers: [RideService, RideRepository],
  controllers: [RideController],
})
export class RideModule {}
