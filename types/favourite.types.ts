import { Destination } from './destination.types';
import { Route, Schedule } from './transport.types';

export interface FavouriteDestination {
  id: string;
  destination: Destination;
  addedAt: string;
}

export interface FavouriteRoute {
  id: string;
  route: Route;
  addedAt: string;
}

export interface FavouriteSchedule {
  id: string;
  schedule: Schedule;
  route: Route;
  addedAt: string;
}

export interface FavouritesState {
  destinations: FavouriteDestination[];
  routes: FavouriteRoute[];
  schedules: FavouriteSchedule[];
}
