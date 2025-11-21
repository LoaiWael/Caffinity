import { useEffect } from "react";
import { useProductsContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import coffeeBackground from "../assets/img/coffee-background.webp";

const CoffeePage = () => {
  const { products, loading } = useProductsContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const coffeeProducts = products.filter(
    // Edit Filters after products are ready (انا الي كاتب الكومنت دة)
    (p) => p.category.name === "jewelery" || p.category.name === "electronics"
  );

  return (
    <div className="bg-brand-white mt-[-7rem]">
      <section className="relative h-96 bg-brand-gray-light">
        <img
          src={coffeeBackground}
          alt="Coffee"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-brand-black bg-black/30 text-center flex-col flex items-center justify-center pt-24">
          <h1 className="font-heading text-5xl mb-4">Coffee</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Your destination for exceptional coffee beans. Taste the difference quality makes.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center">Loading Coffees...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {coffeeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!loading && coffeeProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-brand-black/70">No Coffees found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoffeePage;
