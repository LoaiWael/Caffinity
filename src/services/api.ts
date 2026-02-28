import axios from 'axios';
import { Product } from '../types';

const api = axios.create({
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
