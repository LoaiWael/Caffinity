import { useEffect } from 'react';
import { useProductsContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const TeaPage = () => {
  const { products, loading } = useProductsContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const TeaProducts = products.filter(
    // Edit Filters after products are ready (انا الي كاتب الكومنت دة)
    p => p.category.name === 'jewelery' || p.category.name === 'electronics'
  );

  return (
    <div className="bg-brand-white">
      <section className="bg-brand-gray-light text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-5xl mb-4">Tea</h1>
          <p className="text-lg text-brand-black/70 max-w-2xl mx-auto">
            Elevate your daily ritual. Shop our finest teas and infusions, meticulously chosen for exceptional aroma and taste. The perfect cup is waiting.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center">Loading Coffees...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {TeaProducts.map(product => (
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
