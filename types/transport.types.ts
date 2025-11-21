export interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  transportMode: 'train' | 'bus' | 'private';
  duration: string;
  distance: string;
  price: number;
  popular: boolean;
  scenic: boolean;
}

export interface BusStop {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  city: string;
}

export interface TrainStation {
  id: string;
  code: string;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
}

export interface Schedule {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  trainNumber?: string;
  trainName?: string;
  busNumber?: string;
  busType?: string;
  status: 'on-time' | 'delayed' | 'cancelled';
}

export interface RoutesResponse {
  routes: Route[];
}

export interface BusStopsResponse {
  busStops: BusStop[];
}

export interface TrainStationsResponse {
  trainStations: TrainStation[];
}

export interface SchedulesResponse {
  schedules: Schedule[];
}
