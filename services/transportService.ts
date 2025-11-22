import { Route, BusStop, TrainStation, Schedule } from '@/types/transport.types';
import apiClient from './api';
import { storageService } from './storageService';

const RECENT_ROUTES_KEY = '@gomate_recent_routes';

export const transportService = {
  // Get all routes
  getAllRoutes: async (): Promise<Route[]> => {
    try {
      const routes = await apiClient.get<Route[]>('/routes');
      return routes;
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  },

  // Get popular routes
  getPopularRoutes: async (): Promise<Route[]> => {
    try {
      const routes = await apiClient.get<Route[]>('/routes');
      return routes.filter(r => r.popular).slice(0, 5);
    } catch (error) {
      console.error('Error fetching popular routes:', error);
      return [];
    }
  },

  // Get route by ID
  getRouteById: async (id: string): Promise<Route | null> => {
    try {
      const route = await apiClient.get<Route>(`/routes/${id}`);
      return route;
    } catch (error) {
      console.error(`Error fetching route ${id}:`, error);
      return null;
    }
  },

  // Get all bus stops
  getAllBusStops: async (): Promise<BusStop[]> => {
    try {
      const busStops = await apiClient.get<BusStop[]>('/busStops');
      return busStops;
    } catch (error) {
      console.error('Error fetching bus stops:', error);
      return [];
    }
  },

  // Get all train stations
  getAllTrainStations: async (): Promise<TrainStation[]> => {
    try {
      const stations = await apiClient.get<TrainStation[]>('/trainStations');
      return stations;
    } catch (error) {
      console.error('Error fetching train stations:', error);
      return [];
    }
  },

  // Get schedules for a route
  getSchedulesForRoute: async (routeId: string): Promise<Schedule[]> => {
    try {
      const schedules = await apiClient.get<Schedule[]>('/schedules');
      return schedules.filter(s => s.routeId === routeId);
    } catch (error) {
      console.error(`Error fetching schedules for route ${routeId}:`, error);
      return [];
    }
  },

  // Get all schedules
  getAllSchedules: async (): Promise<Schedule[]> => {
    try {
      const schedules = await apiClient.get<Schedule[]>('/schedules');
      return schedules;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
  },

  // Get schedule by ID
  getScheduleById: async (scheduleId: string): Promise<Schedule | null> => {
    try {
      const schedules = await apiClient.get<Schedule[]>('/schedules');
      return schedules.find(s => s.id === scheduleId) || null;
    } catch (error) {
      console.error(`Error fetching schedule ${scheduleId}:`, error);
      return null;
    }
  },

  // Save recent route (local storage)
  saveRecentRoute: async (route: Route): Promise<void> => {
    try {
      const recentRoutes = await transportService.getRecentRoutes();
      // Remove if already exists
      const filteredRoutes = recentRoutes.filter(r => r.id !== route.id);
      // Add to beginning
      const updatedRoutes = [route, ...filteredRoutes].slice(0, 5); // Keep only last 5
      await storageService.saveItem(RECENT_ROUTES_KEY, updatedRoutes);
    } catch (error) {
      console.error('Error saving recent route:', error);
    }
  },

  // Get recent routes (local storage)
  getRecentRoutes: async (): Promise<Route[]> => {
    try {
      const routes = await storageService.getItem(RECENT_ROUTES_KEY);
      return routes || [];
    } catch (error) {
      console.error('Error fetching recent routes:', error);
      return [];
    }
  },

  // Clear recent routes
  clearRecentRoutes: async (): Promise<void> => {
    try {
      await storageService.removeItem(RECENT_ROUTES_KEY);
    } catch (error) {
      console.error('Error clearing recent routes:', error);
    }
  },
};
