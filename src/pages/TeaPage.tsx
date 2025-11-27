import { useEffect } from "react";
import { useProductsContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";

const TeaPage = () => {
  const { products, loading } = useProductsContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const TeaProducts = products.filter(
    // Edit Filters after products are ready (انا الي كاتب الكومنت دة)
    (p) => p.category.name === "jewelery" || p.category.name === "electronics"
  );

  return (
    <div className="bg-brand-white mt-[-7rem]">
      <section className="relative h-96 bg-brand-gray-light bg-[url(src/assets/img/tea-background.webp)] bg-repeat bg-contain bg-top bg-blend-darken">
        <div className="absolute inset-0 text-brand-black bg-brand-gray/30 text-center flex-col flex items-center justify-center pt-24">
          <h1 className="font-heading text-5xl mb-1">Tea</h1>
          <p className="mx-3 max-w-2xl lg:mx-auto shadow-brand-gray-dark/70 shadow-md bg-brand-white/80 backdrop-blur-md py-1 px-2 rounded-xl text-sm">
            Shop our finest teas and infusions,
            meticulously chosen for exceptional aroma and taste.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center">Loading Coffees...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {TeaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!loading && TeaProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-brand-black/70">No Coffees found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeaPage;
