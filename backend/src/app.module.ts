import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { SeedModule } from './seeds/seed.module';
import { RideModule } from './ride/ride.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver/entity/driver.entity';
import { Ride } from './ride/entity/ride.entity';
import { MyConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../.env'), // Caminho relativo ao subdiretório do backend
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'shopperdb',
      entities: [Driver, Ride],
      synchronize: true, // Use apenas em desenvolvimento
    }),
    MyConfigModule,
    DriverModule,
    SeedModule,
    RideModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
