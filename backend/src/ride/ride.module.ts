import { Module } from '@nestjs/common';
import { RideService } from './service/ride.service';
import { RideController } from './controller/ride.controller';
import { DriverModule } from '../driver/driver.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RideRepository } from './repository/ride.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entity/driver.entity';
import { Ride } from './entity/ride.entity';
@Module({
  imports: [
    DriverModule,
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Driver, Ride]),
  ],
  providers: [RideService, RideRepository],
  controllers: [RideController],
})
export class RideModule {}
