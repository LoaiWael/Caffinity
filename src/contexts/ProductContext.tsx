import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Drink, Category } from "../types";
import { fetchAllData } from "../lib/api";

interface ProductContextType {
  products: Drink[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Drink[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Fetching data from Fake Store API...");

        const { products, categories } = await fetchAllData();

        setProducts(products);
        setCategories(categories);

        console.log("✅ Data loaded successfully from Fake Store API");
        console.log(
          `📦 Products: ${products.length}, 📂 Categories: ${categories.length}`
        );
      } catch (err: any) {
        console.error("❌ Error fetching data from Fake Store API:", err);
        setError(
          err.message ||
          "Failed to fetch products or categories from Fake Store API."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductsContext must be used within a ProductProvider");
  }
  return context;
};
