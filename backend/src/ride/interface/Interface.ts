export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodeResponse {
  results: Array<{
    geometry: {
      location: Coordinates;
    };
    formatted_address: string;
  }>;
  status: string;
}

export interface AvailableDriver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

interface Review {
  rating: number;
  comment: string;
}

export interface RouteResponse {
  routes: Array<{
    duration: string;
    distanceMeters: number;
    polyline: {
      encodedPolyline: string;
    };
  }>;
}
export interface RouteRequestBody {
  origin: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  destination: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  travelMode: string;
  routingPreference: string;
  computeAlternativeRoutes: boolean;
  routeModifiers: {
    avoidTolls: boolean;
    avoidHighways: boolean;
    avoidFerries: boolean;
  };
  languageCode: string;
  units: string;
}
