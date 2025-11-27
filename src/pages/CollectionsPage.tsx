import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProductsContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { ChevronDown, Plus, Minus } from "lucide-react";
import collectionBackground from "../assets/img/collection-background.webp";

const FilterSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-brand-gray-dark/50 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-semibold uppercase tracking-wider">{title}</h3>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

const FilterCheckbox = ({
  label,
  isChecked,
  onChange,
}: {
  label: string;
  isChecked: boolean;
  onChange: (label: string) => void;
}) => (
  <label className="flex items-center gap-3 cursor-pointer capitalize">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-brand-black text-brand-black focus:ring-brand-black"
      checked={isChecked}
      onChange={() => onChange(label)}
    />
    <span className="text-sm">{label}</span>
  </label>
);

const CollectionsPage = () => {
  const { products, categories, loading, error } = useProductsContext();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getInitialCategory = () => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    return category ? [category] : [];
  };

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(getInitialCategory);
  const [sortOption, setSortOption] = useState<string>("default");

  useEffect(() => {
    setSelectedCategories(getInitialCategory());
  }, [location.search]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const displayedProducts = useMemo(() => {
    let filtered = products;

    // تعديل هنا حسب الداتا الجديدة: category نص وليس كائن
    if (selectedCategories.length > 0) {
      filtered = products.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    const sorted = [...filtered];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name)); // تعديل title -> name
        break;
      case "title-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name)); // تعديل title -> name
        break;
      default:
        break;
    }

    return sorted;
  }, [products, selectedCategories, sortOption]);

  return (
    <div className="mt-[-7rem]">
      <section className="relative h-96 bg-brand-gray-light">
        <img
          src={collectionBackground}
          alt="Collections"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pt-24">
          <h1 className="font-heading text-5xl text-brand-white text-center">
            Our Collections
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <p className="text-sm uppercase tracking-wider text-brand-black/70 mb-8">
          Home / Collections
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters */}
          <aside className="lg:w-1/4">
            <FilterSection title="Categories" defaultOpen={true}>
              {categories.map((cat) => (
                <FilterCheckbox
                  key={cat.id}
                  label={cat.name}
                  isChecked={selectedCategories.includes(cat.name)}
                  onChange={handleCategoryChange}
                />
              ))}
            </FilterSection>
          </aside>

          {/* Products Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-brand-black/70">
                {displayedProducts.length} products
              </p>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-transparent border border-brand-gray-dark rounded-md py-2 pl-3 pr-8 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-black"
                >
                  <option value="default">Sort By</option>
                  <option value="title-asc">Name: A-Z</option>
                  <option value="title-desc">Name: Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="h-5 w-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {loading && products.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-black mb-4"></div>
                <p className="text-lg">Loading products...</p>
                <p className="text-sm text-gray-500 mt-2">
                  If this takes too long, check the console for errors
                </p>
              </div>
            )}
            {error && (
              <div className="text-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 font-semibold mb-2">
                    Error loading products
                  </p>
                  <p className="text-red-500 text-sm">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            {!loading && displayedProducts.length === 0 && (
              <div className="text-center py-20 col-span-full">
                <p className="text-lg text-brand-black/70">
                  No products match your current selection.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
