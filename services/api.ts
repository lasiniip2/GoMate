// Base API configuration
const API_BASE_URL = 'https://my-json-server.typicode.com/lasiniip2/GoMate';

// For local development/testing, you can switch to local JSON
const USE_LOCAL = false;
const LOCAL_BASE_URL = '../../data/db.json';

export const getBaseUrl = () => {
  return USE_LOCAL ? LOCAL_BASE_URL : API_BASE_URL;
};

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
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
