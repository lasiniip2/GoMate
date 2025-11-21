import { Destination } from '@/types/destination.types';
import { Route, Schedule } from '@/types/transport.types';
import {
  FavouriteDestination,
  FavouriteRoute,
  FavouriteSchedule,
} from '@/types/favourite.types';
import { storageService } from './storageService';

const FAVOURITES_DESTINATIONS_KEY = '@gomate_favourite_destinations';
const FAVOURITES_ROUTES_KEY = '@gomate_favourite_routes';
const FAVOURITES_SCHEDULES_KEY = '@gomate_favourite_schedules';

export const favouritesService = {
  // Destinations
  getFavouriteDestinations: async (): Promise<FavouriteDestination[]> => {
    try {
      const favourites = await storageService.getItem(FAVOURITES_DESTINATIONS_KEY);
      return favourites || [];
    } catch (error) {
      console.error('Error getting favourite destinations:', error);
      return [];
    }
  },

  addFavouriteDestination: async (destination: Destination): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteDestinations();
      const exists = favourites.find(f => f.destination.id === destination.id);
      if (exists) return;

      const newFavourite: FavouriteDestination = {
        id: `dest_${Date.now()}`,
        destination,
        addedAt: new Date().toISOString(),
      };
      await storageService.saveItem(FAVOURITES_DESTINATIONS_KEY, [
        newFavourite,
        ...favourites,
      ]);
    } catch (error) {
      console.error('Error adding favourite destination:', error);
    }
  },

  removeFavouriteDestination: async (destinationId: string): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteDestinations();
      const updated = favourites.filter(f => f.destination.id !== destinationId);
      await storageService.saveItem(FAVOURITES_DESTINATIONS_KEY, updated);
    } catch (error) {
      console.error('Error removing favourite destination:', error);
    }
  },

  isFavouriteDestination: async (destinationId: string): Promise<boolean> => {
    try {
      const favourites = await favouritesService.getFavouriteDestinations();
      return favourites.some(f => f.destination.id === destinationId);
    } catch (error) {
      console.error('Error checking favourite destination:', error);
      return false;
    }
  },

  // Routes
  getFavouriteRoutes: async (): Promise<FavouriteRoute[]> => {
    try {
      const favourites = await storageService.getItem(FAVOURITES_ROUTES_KEY);
      return favourites || [];
    } catch (error) {
      console.error('Error getting favourite routes:', error);
      return [];
    }
  },

  addFavouriteRoute: async (route: Route): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteRoutes();
      const exists = favourites.find(f => f.route.id === route.id);
      if (exists) return;

      const newFavourite: FavouriteRoute = {
        id: `route_${Date.now()}`,
        route,
        addedAt: new Date().toISOString(),
      };
      await storageService.saveItem(FAVOURITES_ROUTES_KEY, [newFavourite, ...favourites]);
    } catch (error) {
      console.error('Error adding favourite route:', error);
    }
  },

  removeFavouriteRoute: async (routeId: string): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteRoutes();
      const updated = favourites.filter(f => f.route.id !== routeId);
      await storageService.saveItem(FAVOURITES_ROUTES_KEY, updated);
    } catch (error) {
      console.error('Error removing favourite route:', error);
    }
  },

  isFavouriteRoute: async (routeId: string): Promise<boolean> => {
    try {
      const favourites = await favouritesService.getFavouriteRoutes();
      return favourites.some(f => f.route.id === routeId);
    } catch (error) {
      console.error('Error checking favourite route:', error);
      return false;
    }
  },

  // Schedules
  getFavouriteSchedules: async (): Promise<FavouriteSchedule[]> => {
    try {
      const favourites = await storageService.getItem(FAVOURITES_SCHEDULES_KEY);
      return favourites || [];
    } catch (error) {
      console.error('Error getting favourite schedules:', error);
      return [];
    }
  },

  addFavouriteSchedule: async (schedule: Schedule, route: Route): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteSchedules();
      const exists = favourites.find(f => f.schedule.id === schedule.id);
      if (exists) return;

      const newFavourite: FavouriteSchedule = {
        id: `schedule_${Date.now()}`,
        schedule,
        route,
        addedAt: new Date().toISOString(),
      };
      await storageService.saveItem(FAVOURITES_SCHEDULES_KEY, [newFavourite, ...favourites]);
    } catch (error) {
      console.error('Error adding favourite schedule:', error);
    }
  },

  removeFavouriteSchedule: async (scheduleId: string): Promise<void> => {
    try {
      const favourites = await favouritesService.getFavouriteSchedules();
      const updated = favourites.filter(f => f.schedule.id !== scheduleId);
      await storageService.saveItem(FAVOURITES_SCHEDULES_KEY, updated);
    } catch (error) {
      console.error('Error removing favourite schedule:', error);
    }
  },

  isFavouriteSchedule: async (scheduleId: string): Promise<boolean> => {
    try {
      const favourites = await favouritesService.getFavouriteSchedules();
      return favourites.some(f => f.schedule.id === scheduleId);
    } catch (error) {
      console.error('Error checking favourite schedule:', error);
      return false;
    }
  },

  // Clear all favourites
  clearAllFavourites: async (): Promise<void> => {
    try {
      await Promise.all([
        storageService.removeItem(FAVOURITES_DESTINATIONS_KEY),
        storageService.removeItem(FAVOURITES_ROUTES_KEY),
        storageService.removeItem(FAVOURITES_SCHEDULES_KEY),
      ]);
    } catch (error) {
      console.error('Error clearing favourites:', error);
    }
  },
};
