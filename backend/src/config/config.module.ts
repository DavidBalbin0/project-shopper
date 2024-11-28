import { Module } from '@nestjs/common';
import { ConfigController } from './controller/config.controller';

@Module({
  controllers: [ConfigController],
})
export class MyConfigModule {}
