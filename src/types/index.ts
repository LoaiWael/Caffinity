export interface Category {
  id: number;
  name: string;
  created_at?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
  created_at?: string;
  category: Category;
  rating: {
    rate: number;
    count: number;
  };
}

export type CartItem = Product & {
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
  products: Product | null;
}

export interface Order {
  id: number;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: unknown | null;
  order_items: OrderItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  featured?: boolean;
}

export interface MockUser {
  id: string;
  email: string;
}

// Legacy API types (kept for compatibility)
export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCategory {
  id: number;
  name: string;
}
