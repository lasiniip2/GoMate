// Base API configuration
const API_BASE_URL = 'https://my-json-server.typicode.com/lasiniip2/GoMate';

// For local development/testing, you can switch to local JSON
const USE_LOCAL = true; // Changed to true to use local database with updated fields
const LOCAL_DATA = require('../data/db.json');

export const getBaseUrl = () => {
  return USE_LOCAL ? 'local' : API_BASE_URL;
};

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      // Use local data when USE_LOCAL is true
      if (USE_LOCAL) {
        // Parse the endpoint to get the resource and id
        const parts = endpoint.split('/').filter(p => p);
        const resource = parts[0];
        const id = parts[1];
        
        if (id) {
          // Get specific item by id
          const item = LOCAL_DATA[resource]?.find((item: any) => item.id === id);
          return item as T;
        } else {
          // Get all items
          return LOCAL_DATA[resource] as T;
        }
      }
      
      // Use remote API when USE_LOCAL is false
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiClient;
