import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModule } from './driver/driver.module';
import { SeedModule } from './seeds/seed.module';
import { RideModule } from './ride/ride.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://shopper:password@localhost:27017/shopperdb',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../.env'), // Caminho relativo ao subdiretório do backend
    }),
    DriverModule,
    SeedModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
