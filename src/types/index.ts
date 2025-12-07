export type Category = "Hot Drinks" | "Cold Drinks" | "Fresh Juices" | "Smoothies" | "Milkshakes" | "Specialty Drinks" | "Energy Drinks";

export interface Drink {
  id: number;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image: string | null;
  created_at?: string;
  category: Category | string;
  rating: number;
  available: boolean;
}

export type CartItem = Drink & {
  quantity: number;
};

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  updated_at: string | null;
}

export interface OrderItem {
  id: number;
  productId: number;
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