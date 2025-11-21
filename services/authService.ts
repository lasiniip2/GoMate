import { User, LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth.types';
import { storageService } from './storageService';
import { validateEmail, validatePassword } from '@/utils/validation';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export const authService = {
  // Register new user
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const { name, email, password } = credentials;

      // Get existing users
      const users = await storageService.getUsersDB();

      // Check if user already exists
      const existingUser = users.find((u: StoredUser) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return {
          success: false,
          message: 'An account with this email already exists',
        };
      }

      // Create new user
      const newUser: StoredUser = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      };

      // Save to users database
      users.push(newUser);
      await storageService.saveUsersDB(users);

      // Create user object (without password)
      const user: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      };

      // Save current user
      await storageService.saveUser(user);

      return {
        success: true,
        user,
        message: 'Account created successfully',
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'An error occurred during registration. Please try again.',
      };
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const { email, password } = credentials;

      // Get all users
      const users = await storageService.getUsersDB();

      // Find user by email
      const storedUser = users.find(
        (u: StoredUser) => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (!storedUser) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Check password
      if (storedUser.password !== password) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Create user object (without password)
      const user: User = {
        id: storedUser.id,
        email: storedUser.email,
        name: storedUser.name,
        createdAt: storedUser.createdAt,
      };

      // Save current user
      await storageService.saveUser(user);

      return {
        success: true,
        user,
        message: 'Login successful',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login. Please try again.',
      };
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await storageService.removeUser();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await storageService.getUser();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const user = await storageService.getUser();
      return user !== null;
    } catch (error) {
      console.error('Check authentication error:', error);
      return false;
    }
  },
};
