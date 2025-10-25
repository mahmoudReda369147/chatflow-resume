import { makeApiCall } from '../makeApiCall';
import { AUTH_ENDPOINTS } from './authEndpoints';

// Types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Authentication services
export const authServices = {
  // Register a new user
  register: async (data: RegisterData) => {
    const response = await makeApiCall<AuthResponse>({
      method: 'POST',
      url: AUTH_ENDPOINTS.REGISTER,
      data,
    });
    return response.data;
  },

  // Login user
  login: async (data: LoginData) => {
    const response = await makeApiCall<AuthResponse>({
      method: 'POST',
      url: AUTH_ENDPOINTS.LOGIN,
      data,
    });
    return response.data;
  },

  // Save auth token to local storage
  saveToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // Get auth token from local storage
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Remove auth token from local storage
  removeToken: () => {
    localStorage.removeItem('token');
  },

  // Save user to local storage
  saveUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get user from local storage
  getUser: (): User | null => {
    const raw = localStorage.getItem('user');
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  // Remove user from local storage
  removeUser: () => {
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};