import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimateRideDto } from './dto/estimate-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async estimateRide(@Body() rideDto: EstimateRideDto) {
    try {
      return await this.rideService.estimateRide(rideDto);
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          error_code: 'INTERNAL_ERROR',
          error_description: 'Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
