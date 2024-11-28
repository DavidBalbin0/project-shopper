import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Patch,
  Get,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { RideService } from '../service/ride.service';
import { RideEstimateDto } from '../dto/ride-estimate.dto';
import { RideEstimateResponseDto } from '../dto/ride-estimate-response.dto';
import { ConfirmRideDto } from '../dto/confirm-ride.dto';
import { DriverService } from '../../driver/service/driver.service';

@Controller('ride')
export class RideController {
  constructor(
    private readonly rideService: RideService,
    private readonly driverService: DriverService,
  ) {}

  @Post('estimate')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async estimateRide(
    @Body() rideDto: RideEstimateDto,
  ): Promise<RideEstimateResponseDto> {
    return await this.rideService.estimateRide(rideDto);
  }

  @Patch('confirm')
  async confirmRide(@Body() confirmRideDto: ConfirmRideDto) {
    await this.rideService.confirmRide(confirmRideDto);
    return { success: true };
  }

  @Get('/:customer_id')
  async getRides(
    @Param('customer_id') customerId: number,
    @Query('driver_id') driverId?: number,
  ) {
    return await this.rideService.getRides(customerId, driverId);
  }
}
