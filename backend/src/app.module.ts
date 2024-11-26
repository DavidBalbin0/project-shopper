import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModule } from './driver/driver.module';
import { SeedModule } from './seeds/seed.module';
import { RideModule } from './ride/ride.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Driver} from "./driver/driver.entity";
import {Ride} from "./ride/ride.entity";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://shopper:password@localhost:27017/shopperdb',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../.env'), // Caminho relativo ao subdiretório do backend
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'shopperdb',
      entities: [Driver, Ride],
      synchronize: true, // Use apenas em desenvolvimento
    }),
    DriverModule,
    SeedModule,
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
