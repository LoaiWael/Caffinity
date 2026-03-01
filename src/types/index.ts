export type Category = "Hot Drinks" | "Cold Drinks" | "Fresh Juices" | "Smoothies" | "Milkshakes" | "Specialty Drinks" | "Energy Drinks";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Category | string;
  image: string;
  isAvailable: boolean;
  slug: string;
  __v: number;
}

export type CartItem = Product & {
  quantity: number;
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface OrderItem {
  id: number;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string | null;
}

export interface Order {
  id: string;
  userId: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: Address | null;
  order_items: OrderItem[];
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface MockUser {
  id: string;
  email: string;
}

export interface ItokenData {
  id: string;
  iat: number;
  exp: number;
}