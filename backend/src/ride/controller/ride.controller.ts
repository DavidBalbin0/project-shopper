import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
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
import { DriverService } from '../../driver/driver.service';

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
    try {
      return await this.rideService.estimateRide(rideDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          error_code: 'INTERNAL_ERROR',
          message: 'Ocorreu um erro inesperado.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('confirm')
  async confirmRide(@Body() confirmRideDto: ConfirmRideDto) {
    try {
      await this.rideService.confirmRide(confirmRideDto);
      return { success: true };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          error_code: 'UNKNOWN_ERROR',
          error_description: `Ocorreu um erro inesperado. ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:customer_id')
  async getRides(
    @Param('customer_id') customerId: number,
    @Query('driver_id') driverId?: number,
  ) {
    // Validações
    if (!customerId) {
      throw new HttpException(
        {
          error_code: 'INVALID_CUSTOMER',
          error_description: 'O id do usuário não pode estar vazio.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (driverId) {
      const isDriverValid = await this.driverService.validateDriver(driverId);
      if (!isDriverValid) {
        throw new HttpException(
          {
            error_code: 'INVALID_DRIVER',
            error_description: 'O id do motorista fornecido é inválido.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Busca no serviço
    const rides = await this.rideService.getRides(customerId, driverId);

    if (!rides || rides.length === 0) {
      throw new HttpException(
        {
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Nenhuma corrida encontrada para este usuário.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      customer_id: customerId,
      rides,
    };
  }
}
