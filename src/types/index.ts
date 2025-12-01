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
  order_id: number;
  quantity: number;
  price_at_purchase: number;
  products: Drink | null;
}

export interface Order {
  id: number;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: unknown | null;
  order_items: OrderItem[];
}

export interface MockUser {
  id: string;
  email: string;
}