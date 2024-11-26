import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverService],
  exports: [DriverService],
})

export class DriverModule {}
