import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DriverService } from '../../driver/driver.service';
import { ConfigService } from '@nestjs/config';
import { RideEstimateDto } from '../dto/ride-estimate.dto';
import {
  Coordinates,
  GeocodeResponse,
  RouteRequestBody,
  RouteResponse,
} from '../model/Models';
import { RideEstimateResponseDto } from '../dto/ride-estimate-response.dto';
import { HttpService } from '@nestjs/axios';
import { ConfirmRideDto } from '../dto/confirm-ride.dto';
import { RideRepository } from '../ride.repository';
import { Ride } from '../ride.entity';

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
    if (!route || !route.routes || route.routes.length === 0) {
      throw new HttpException(
        {
          error_code: 'SERVICE_UNAVAILABLE',
          message:
            'Erro ao calcular a rota. Não foi possível obter a rota da API.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const routeData = route.routes[0];

    // Get the distance in km and duration
    const distanceInKm = routeData.distanceMeters / 1000;
    const duration = routeData.duration;

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

  private validateData(data: RideEstimateDto) {
    if (data.origin === data.destination) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          message: 'Origem e destino não podem ser iguais.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Function to get coordinates from an address using Google Geocode API
  async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    const response = await this.httpService.axiosRef.get<GeocodeResponse>(url);
    if (response.status !== 200 || response.data.results.length === 0) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          message: 'Erro ao obter coordenadas do Google Maps.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Return the coordinates
    return response.data.results[0].geometry.location;
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
          message: 'Erro ao obter dados da API do Google Maps.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return response.data;
  }

  async confirmRide(confirmRideDto: ConfirmRideDto): Promise<void> {
    const { distance, driver } = confirmRideDto;

    // Validações
    this.validateOriginAndDestination(confirmRideDto);

    // Verificar se o motorista é válido
    const foundDriver = await this.driverService.validateDriver(driver.id);

    if (!foundDriver) {
      throw new HttpException(
        {
          error_code: 'DRIVER_NOT_FOUND',
          error_description: 'Motorista não encontrado.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Verificar se a quilometragem é válida para o motorista
    if (foundDriver.minKm > distance) {
      throw new HttpException(
        {
          error_code: 'INVALID_DISTANCE',
          message: 'Quilometragem inválida para o motorista selecionado.',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // Salvar os dados da viagem no banco de dados
    await this.rideRepository.saveRide(
      this.mapConfirmRideDtoToRide(confirmRideDto),
    );
  }

  async getRides(customerId: number, driverId?: number) {
    // Obtenha as corridas filtradas pelo repositório
    const rides = await this.rideRepository.findRidesByFilters(
      customerId,
      driverId,
    );

    // Enriquecer os dados com informações do driver, se necessário
    const enrichedRides = rides.map((ride) => ({
      id: ride.id,
      customer_id: ride.customer_id,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      value: ride.value,
      driver: {
        id: ride.driver?.id,
        name: ride.driver?.name,
      },
    }));

    return enrichedRides;
  }

  private validateOriginAndDestination(data: ConfirmRideDto): void {
    const { origin, destination } = data;
    if (origin === destination) {
      throw new HttpException(
        {
          error_code: 'INVALID_DATA',
          message: 'Origem e destino não podem ser iguais.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
}
