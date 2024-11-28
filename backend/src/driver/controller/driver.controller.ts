import { Controller, Get } from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { Driver } from '../entity/driver.entity';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.findAll();
  }
}
