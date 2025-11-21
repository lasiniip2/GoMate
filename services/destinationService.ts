import { Destination } from '@/types/destination.types';
import apiClient from './api';

export const destinationService = {
  // Get all destinations
  getAllDestinations: async (): Promise<Destination[]> => {
    try {
      const destinations = await apiClient.get<Destination[]>('/destinations');
      return destinations;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  },

  // Get suggested destinations (first 6)
  getSuggestedDestinations: async (): Promise<Destination[]> => {
    try {
      const destinations = await apiClient.get<Destination[]>('/destinations');
      return destinations.slice(0, 6);
    } catch (error) {
      console.error('Error fetching suggested destinations:', error);
      return [];
    }
  },

  // Get popular destinations
  getPopularDestinations: async (): Promise<Destination[]> => {
    try {
      const destinations = await apiClient.get<Destination[]>('/destinations');
      return destinations.filter(d => d.popular);
    } catch (error) {
      console.error('Error fetching popular destinations:', error);
      return [];
    }
  },

  // Get destination by ID
  getDestinationById: async (id: string): Promise<Destination | null> => {
    try {
      const destination = await apiClient.get<Destination>(`/destinations/${id}`);
      return destination;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      return null;
    }
  },

  // Search destinations by name
  searchDestinations: async (query: string): Promise<Destination[]> => {
    try {
      const destinations = await apiClient.get<Destination[]>('/destinations');
      const searchTerm = query.toLowerCase();
      return destinations.filter(d => 
        d.name.toLowerCase().includes(searchTerm) ||
        d.description.toLowerCase().includes(searchTerm) ||
        d.category.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching destinations:', error);
      return [];
    }
  },
};
