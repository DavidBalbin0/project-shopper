import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}
  @Get()
  getConfig() {
    return {
      googleApiKey: this.configService.get<string>('GOOGLE_API_KEY'),
    };
  }
}
