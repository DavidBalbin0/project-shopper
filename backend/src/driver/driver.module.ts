import { Module } from '@nestjs/common';
import { DriverService } from './service/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entity/driver.entity';
import { DriverController } from './controller/driver.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService],
})
export class DriverModule {}
