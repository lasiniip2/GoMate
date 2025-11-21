import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/auth.types';

const KEYS = {
  USER: '@gomate_user',
  USERS_DB: '@gomate_users_db',
  TOKEN: '@gomate_token',
};

export const storageService = {
  // Save current user
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  // Get current user
  getUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Remove current user (logout)
  removeUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
      await AsyncStorage.removeItem(KEYS.TOKEN);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  },

  // Save all registered users (simulating a database)
  saveUsersDB: async (users: any[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(KEYS.USERS_DB, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users DB:', error);
      throw error;
    }
  },

  // Get all registered users
  getUsersDB: async (): Promise<any[]> => {
    try {
      const usersData = await AsyncStorage.getItem(KEYS.USERS_DB);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error getting users DB:', error);
      return [];
    }
  },

  // Clear all data
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
