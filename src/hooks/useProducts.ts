import { useState, useEffect } from "react";
import { Product } from "../types";
import { useProductsContext } from "../contexts/ProductContext";
import { fetchProduct, transformFakeStoreProduct } from "../lib/api";

export function useProducts() {
  return useProductsContext();
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { products, categories } = useProductsContext();

  useEffect(() => {
    if (!id) return;

    const findProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to find the product in the context (already loaded products)
        const existingProduct = products.find((p) => p.id === parseInt(id));

        if (existingProduct) {
          setProduct(existingProduct);
        } else {
          // If not found in context, fetch from API
          console.log(`🔄 Fetching product ${id} from Fake Store API...`);
          const fakeStoreProduct = await fetchProduct(parseInt(id));
          const transformedProduct = transformFakeStoreProduct(
            fakeStoreProduct,
            categories
          );
          setProduct(transformedProduct);
          console.log(`✅ Product ${id} fetched successfully`);
        }
      } catch (err: any) {
        console.error(`❌ Error fetching product ${id}:`, err);
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    findProduct();
  }, [id, products, categories]);

  return { product, loading, error };
}
