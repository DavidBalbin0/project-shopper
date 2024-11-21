import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { DriverModule } from '../driver/driver.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
@Module({
  imports: [DriverModule, ConfigModule, HttpModule],
  providers: [RideService],
  controllers: [RideController],
})
export class RideModule {}
