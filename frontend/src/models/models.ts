// src/types.ts
export interface Review {
    rating: number;
    comment: string;
}

export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: Review;
    value: number;
}

export interface EstimateRideResponse {
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    distance: number;
    duration: string;
    options: Driver[]; // Lista de motoristas
    routeResponse: {
        routes: {
            distanceMeters: number;
            duration: string;
            polyline: {
                encodedPolyline: string;
            };
        }[];
    };
}
