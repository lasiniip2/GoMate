import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Destination } from '@/types/destination.types';
import { Route, Schedule } from '@/types/transport.types';
import {
  FavouriteDestination,
  FavouriteRoute,
  FavouriteSchedule,
} from '@/types/favourite.types';
import { favouritesService } from '@/services/favouritesService';

interface FavouritesContextType {
  favouriteDestinations: FavouriteDestination[];
  favouriteRoutes: FavouriteRoute[];
  favouriteSchedules: FavouriteSchedule[];
  addDestination: (destination: Destination) => Promise<void>;
  removeDestination: (destinationId: string) => Promise<void>;
  isDestinationFavourite: (destinationId: string) => boolean;
  addRoute: (route: Route) => Promise<void>;
  removeRoute: (routeId: string) => Promise<void>;
  isRouteFavourite: (routeId: string) => boolean;
  addSchedule: (schedule: Schedule, route: Route) => Promise<void>;
  removeSchedule: (scheduleId: string) => Promise<void>;
  isScheduleFavourite: (scheduleId: string) => boolean;
  refreshFavourites: () => Promise<void>;
  loading: boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favouriteDestinations, setFavouriteDestinations] = useState<FavouriteDestination[]>(
    []
  );
  const [favouriteRoutes, setFavouriteRoutes] = useState<FavouriteRoute[]>([]);
  const [favouriteSchedules, setFavouriteSchedules] = useState<FavouriteSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    setLoading(true);
    try {
      const [destinations, routes, schedules] = await Promise.all([
        favouritesService.getFavouriteDestinations(),
        favouritesService.getFavouriteRoutes(),
        favouritesService.getFavouriteSchedules(),
      ]);
      setFavouriteDestinations(destinations);
      setFavouriteRoutes(routes);
      setFavouriteSchedules(schedules);
    } catch (error) {
      console.error('Error loading favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDestination = async (destination: Destination) => {
    await favouritesService.addFavouriteDestination(destination);
    await loadFavourites();
  };

  const removeDestination = async (destinationId: string) => {
    await favouritesService.removeFavouriteDestination(destinationId);
    await loadFavourites();
  };

  const isDestinationFavourite = (destinationId: string) => {
    return favouriteDestinations.some(f => f.destination.id === destinationId);
  };

  const addRoute = async (route: Route) => {
    await favouritesService.addFavouriteRoute(route);
    await loadFavourites();
  };

  const removeRoute = async (routeId: string) => {
    await favouritesService.removeFavouriteRoute(routeId);
    await loadFavourites();
  };

  const isRouteFavourite = (routeId: string) => {
    return favouriteRoutes.some(f => f.route.id === routeId);
  };

  const addSchedule = async (schedule: Schedule, route: Route) => {
    await favouritesService.addFavouriteSchedule(schedule, route);
    await loadFavourites();
  };

  const removeSchedule = async (scheduleId: string) => {
    await favouritesService.removeFavouriteSchedule(scheduleId);
    await loadFavourites();
  };

  const isScheduleFavourite = (scheduleId: string) => {
    return favouriteSchedules.some(f => f.schedule.id === scheduleId);
  };

  const refreshFavourites = async () => {
    await loadFavourites();
  };

  return (
    <FavouritesContext.Provider
      value={{
        favouriteDestinations,
        favouriteRoutes,
        favouriteSchedules,
        addDestination,
        removeDestination,
        isDestinationFavourite,
        addRoute,
        removeRoute,
        isRouteFavourite,
        addSchedule,
        removeSchedule,
        isScheduleFavourite,
        refreshFavourites,
        loading,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}
