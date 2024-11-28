import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DriverService } from '../../driver/service/driver.service';
import { ConfigService } from '@nestjs/config';
import { RideEstimateDto } from '../dto/ride-estimate.dto';
import {
  Coordinates,
  GeocodeResponse,
  RouteRequestBody,
  RouteResponse,
} from '../interface/Interface';
import { RideEstimateResponseDto } from '../dto/ride-estimate-response.dto';
import { HttpService } from '@nestjs/axios';
import { ConfirmRideDto } from '../dto/confirm-ride.dto';
import { RideRepository } from '../repository/ride.repository';
import { Ride } from '../entity/ride.entity';
import { CustomHttpException } from 'src/commom/exceptions/CustomHttpException';

@Injectable()
export class RideService {
  private apiKey: string;

  constructor(
    private readonly driverService: DriverService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly rideRepository: RideRepository,
  ) {
    this.apiKey = this.configService.get<string>('GOOGLE_API_KEY');
  }

  // Function to estimate a ride
  async estimateRide(data: RideEstimateDto) {
    this.validateData(data);

    // Get coordinates from origin and destination
    const originCoordinates = await this.getCoordinatesFromAddress(data.origin);
    const destinationCoordinates = await this.getCoordinatesFromAddress(
      data.destination,
    );

    // Call Google Maps API to get route
    const route = await this.getRouteFromGoogleMaps(
      originCoordinates,
      destinationCoordinates,
    );

    // verify if route is valid
    this.validateRoute(route);

    // Calculate distance and duration
    const { distanceInKm, duration } = this.calculateDistanceAndDuration(route);

    const availableDrivers =
      await this.driverService.getAvailableDrivers(distanceInKm);

    return new RideEstimateResponseDto(
      originCoordinates,
      destinationCoordinates,
      distanceInKm,
      duration,
      availableDrivers,
      route,
    );
  }

  // Function to get coordinates from an address using Google Geocode API
  async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    const response = await this.httpService.axiosRef.get<GeocodeResponse>(url);
    if (response.status !== 200 || response.data.results.length === 0) {
      throw new CustomHttpException(
        'INVALID_DATA',
        ['Erro ao obter coordenadas do Google Maps.'],
        HttpStatus.BAD_REQUEST,
      );
    }

    // Return the coordinates
    return response.data.results[0].geometry.location;
  }

  private validateData(data: RideEstimateDto) {
    if (data.origin === data.destination) {
      throw new CustomHttpException(
        'INVALID_DATA',
        ['Origem e destino não podem ser iguais.'],
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateRoute(route: RouteResponse): void {
    if (!route || !route.routes || route.routes.length === 0) {
      throw new CustomHttpException(
        'SERVICE_UNAVAILABLE',
        ['Erro ao calcular a rota. Não foi possível obter a rota da API.'],
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private calculateDistanceAndDuration(route: RouteResponse): {
    distanceInKm: number;
    duration: string;
  } {
    const routeData = route.routes[0];
    const distanceInKm = routeData.distanceMeters / 1000;
    const duration = routeData.duration;
    return { distanceInKm, duration };
  }

  // Function to get route from Google Maps using the Directions API
  async getRouteFromGoogleMaps(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<RouteResponse> {
    const requestBody: RouteRequestBody = {
      origin: {
        location: {
          latLng: {
            latitude: origin.lat,
            longitude: origin.lng,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: destination.lat,
            longitude: destination.lng,
          },
        },
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE',
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: 'en-US',
      units: 'METRIC',
    };
    const response = await this.httpService.axiosRef.post<RouteResponse>(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
        },
      },
    );
    if (response.status !== 200) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          error_description: 'Erro ao obter dados da API do Google Maps.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data;
  }

  async confirmRide(confirmRideDto: ConfirmRideDto): Promise<void> {
    this.validateOriginAndDestination(confirmRideDto);

    // Verify if the driver is available
    const foundDriver = await this.verifyDriverAvailability(
      confirmRideDto.driver.id,
    );

    this.verifyDriverDistance(foundDriver, confirmRideDto.distance);

    await this.saveRide(confirmRideDto);
  }

  private validateOriginAndDestination(data: ConfirmRideDto): void {
    const { origin, destination } = data;
    if (origin === destination) {
      throw new CustomHttpException(
        'INVALID_DATA',
        ['Origem e destino não podem ser iguais.'],
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyDriverAvailability(driverId: number) {
    const foundDriver = await this.driverService.validateDriver(driverId);
    if (!foundDriver) {
      throw new CustomHttpException(
        'DRIVER_NOT_FOUND',
        ['Motorista não encontrado.'],
        HttpStatus.NOT_FOUND,
      );
    }
    return foundDriver;
  }

  private verifyDriverDistance(driver: any, distance: number): void {
    if (driver.minKm > distance) {
      throw new CustomHttpException(
        'INVALID_DISTANCE',
        ['Quilometragem inválida para o motorista selecionado.'],
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  private async saveRide(confirmRideDto: ConfirmRideDto): Promise<void> {
    const ride = this.mapConfirmRideDtoToRide(confirmRideDto);
    await this.rideRepository.saveRide(ride);
  }

  mapConfirmRideDtoToRide(confirmRideDto: ConfirmRideDto): Ride {
    return {
      id: null,
      customer_id: confirmRideDto.customer_id,
      origin: confirmRideDto.origin,
      destination: confirmRideDto.destination,
      distance: confirmRideDto.distance,
      duration: confirmRideDto.duration,
      value: confirmRideDto.value,
      driver: confirmRideDto.driver,
    } as Ride;
  }

  async getRides(customerId: number, driverId?: number) {
    this.validateCustomerId(customerId);
    if (driverId) {
      await this.validateDriverId(driverId);
    }

    const rides = await this.rideRepository.findRidesByFilters(
      customerId,
      driverId,
    );
    this.validateRides(rides);

    return {
      customer_id: customerId,
      rides: rides.map((ride) => ({
        id: ride.id,
        customer_id: ride.customer_id,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        value: ride.value,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
        },
        date: ride.created_at,
      })),
    };
  }

  private validateCustomerId(customerId: number) {
    if (!customerId) {
      throw new CustomHttpException(
        'INVALID_CUSTOMER',
        ['O id do usuário não pode estar vazio.'],
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private async validateDriverId(driverId: number) {
    const isDriverValid = await this.driverService.validateDriver(driverId);
    if (!isDriverValid) {
      throw new CustomHttpException(
        'INVALID_DRIVER',
        ['O id do motorista fornecido é inválido.'],
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateRides(rides: Ride[]) {
    if (!rides || rides.length === 0) {
      throw new CustomHttpException(
        'NO_RIDES_FOUND',
        ['Nenhuma corrida encontrada para este usuário.'],
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
