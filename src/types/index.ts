import { Tables } from "./supabase";

// Fake Store API types
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

// Converted types to match existing structure
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
  image: string | null;
  rating: {
    rate: number;
    count: number;
  };
  category: {
    id: number;
    name: string;
  };
  created_at?: string;
};

export type Category = {
  id: number;
  name: string;
  created_at?: string;
};

// Legacy Supabase types (kept for compatibility)
export type SupabaseProduct = Omit<Tables<"products">, "category_id"> & {
  category: Tables<"categories">;
  rating: {
    rate: number;
    count: number;
  };
};

export type SupabaseCategory = Tables<"categories">;

export type CartItem = Product & {
  quantity: number;
};

export type Profile = Tables<"profiles">;

export type Order = Omit<Tables<"orders">, "user_id"> & {
  order_items: (Omit<Tables<"order_items">, "product_id"> & {
    products: Product | null;
  })[];
};

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
