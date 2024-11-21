import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from './schemas/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema }]),
  ],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
