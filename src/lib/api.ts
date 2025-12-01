import axios from "axios";
import { FakeStoreProduct, Drink, Category } from "../types";

// Base URL for Fake Store API
const FAKE_STORE_API_BASE = "https://fakestoreapi.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: FAKE_STORE_API_BASE,
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch all products from Fake Store API
 */
export const fetchProducts = async (): Promise<FakeStoreProduct[]> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProduct = async (id: number): Promise<FakeStoreProduct> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }
};

/**
 * Fetch all categories from Fake Store API
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get("/products/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (
  category: string
): Promise<FakeStoreProduct[]> => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error(`Failed to fetch products for category ${category}`);
  }
};

/**
 * Transform Fake Store API product to our internal Product type
 */
export const transformFakeStoreProduct = (
  fakeProduct: FakeStoreProduct,
  categories: Category[]
): Drink => {
  const categoryObj = categories.find(
    (cat) => cat.name === fakeProduct.category
  );

  return {
    id: fakeProduct.id,
    title: fakeProduct.title,
    price: fakeProduct.price,
    description: fakeProduct.description,
    image: fakeProduct.image,
    rating: fakeProduct.rating,
    category: categoryObj || {
      id: 0,
      name: fakeProduct.category,
      created_at: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
  };
};

/**
 * Transform category names to Category objects with IDs
 */
export const transformCategories = (categoryNames: string[]): Category[] => {
  return categoryNames.map((name, index) => ({
    id: index + 1,
    name,
    created_at: new Date().toISOString(),
  }));
};

/**
 * Fetch and transform all data for the application
 */
export const fetchAllData = async (): Promise<{
  products: Drink[];
  categories: Category[];
}> => {
  try {
    // Fetch categories first
    const categoryNames = await fetchCategories();
    const categories = transformCategories(categoryNames);

    // Fetch products
    const fakeProducts = await fetchProducts();
    const products = fakeProducts.map((product) =>
      transformFakeStoreProduct(product, categories)
    );

    return { products, categories };
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};
