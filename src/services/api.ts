import axios from 'axios';
import { Product } from '../types';

export const api = axios.create({
  baseURL: '/api/v1',
});

export interface GetProductsParams {
  category?: string;
  "price[gte]"?: number;
  "price[lte]"?: number;
  "ratingsAverage[gte]"?: number;
  sort?: string;
}

export const productService = {
  /**
   * Fetch all products with optional filtering and sorting
   */
  getProducts: async (params?: GetProductsParams) => {
    const response = await api.get<{ status: string; results?: number; data: Product[] }>('/products', { params });
    return response.data;
  },

  /**
   * Fetch a single product by ID
   */
  getProductById: async (id: string) => {
    const response = await api.get<{ status: string; data: Product }>(`/products/${id}`);
    return response.data;
  }
};

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: any) => {
    const response = await api.post('/users/signin', credentials);
    return response.data;
  },

  /**
   * Signup user
   */
  signup: async (userData: any) => {
    const response = await api.post('/users/signup', userData);
    return response;
  },

  /**
   * Logout user
   */
  logout: async () => {
    const response = await api.get('/users/logout');
    return response;
  },

  /**
   * Request password reset
   */
  forgetPassword: async (email: string) => {
    const response = await api.post('/users/forgetPassword', { email });
    return response;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, data: { password: string, confirmPassword: string }) => {
    const response = await api.patch(`/users/resetPassword/${token}`, data);
    return response;
  },

  /**
   * Get current user profile
   */
  getMe: async (token: string) => {
    const response = await api.get('/users/getMe', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};
