import { AvailableDriver, Coordinates, RouteResponse } from '../model/Models';

export class RideEstimateResponseDto {
  constructor(
    public origin: Coordinates,
    public destination: Coordinates,
    public distance: number,
    public duration: string,
    public options: AvailableDriver[],
    public routeResponse: RouteResponse,
  ) {}
}
