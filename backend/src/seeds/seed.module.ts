import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {Driver} from "../driver/entity/driver.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [SeedService],
})
export class SeedModule {}
