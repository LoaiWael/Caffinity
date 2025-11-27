import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Coffee, Award, Truck, Tag, Star, Percent } from "lucide-react";
import { useProductsContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import drinksData from "../data/drinks_menu.json";

// استخدام البيانات
const drinks = drinksData;
console.log(drinks); // هيطبع كل المشروبات
const features = [
  { icon: Coffee, text: "WIDE SELECTION" },
  { icon: Award, text: "TOP QUALITY PRODUCTS" },
  { icon: Truck, text: "FREE DELIVERY" },
  { icon: Tag, text: "GREAT DEALS" },
];

const categories = [
  {
    id: 1,
    name: "Hot Drinks",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Cold Drinks",
    image:
      "https://plus.unsplash.com/premium_photo-1677607237294-b041e4b57391?w=400&h=400&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Fresh Juices",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Smoothies",
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Milkshakes",
    image:
      "https://images.unsplash.com/photo-1641665271888-575e46923776?w=400&h=400&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Specialty Drinks",
    image:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Energy Drinks",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
];

const HomePage = () => {
  const { products } = useProductsContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const mostPopularProducts = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 8);

  const discountedProducts = [...products]
    .filter((p) => p.rating.rate >= 4.0)
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  const calculateDiscount = (price: number) => {
    return (price * 0.8).toFixed(2);
  };

  return (
    <div className="bg-brand-white">
      {/* Hero Section */}
      <section className="relative container mx-auto mt-3 flex flex-col lg:flex-row items-center justify-center lg:justify-start py-20 lg:py-0 lg:h-[calc(100vh-6rem)]">
        <div className="lg:w-1/2 text-center lg:text-left z-10 p-8">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-black mb-6">
            Taste the perfect moment.
          </h1>
          <p className="text-brand-black/80 mb-8 max-w-md mx-auto lg:mx-0">
            Your daily dose of delicious. Shop the finest coffees and teas,
            delivered right to your door.
          </p>
          <Button asChild to="/collections">
            Browse Collections
          </Button>
        </div>
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full w-full mt-8 lg:mt-0 px-4 h-auto">
          <img
            src="src/assets/img/drinks-photo.webp"
            alt="Featured products"
            className="w-full lg:h-[80vh] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-brand-gray-light py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              >
                <feature.icon className="h-8 w-8 text-brand-black" />
                <p className="font-semibold text-sm uppercase tracking-wider">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl mb-12">Our Collections</h2>
          <div className="flex items-center justify-center flex-wrap gap-x-[5vw] gap-y-12">
            {categories.map((cat) => (
              <Link
                to={`/collections?category=${cat.name}`}
                key={cat.id}
                className="group"
              >
                <div className="bg-brand-gray-light aspect-square overflow-hidden rounded-full max-w-48">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 font-semibold tracking-wider capitalize">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Section */}
      <section className="bg-brand-gray-light py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Star className="h-8 w-8 text-brand-black" fill="currentColor" />
            <h2 className="font-heading text-4xl text-center">Most Popular</h2>
            <Star className="h-8 w-8 text-brand-black" fill="currentColor" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {drinks.slice(0, 10).map((drink) => (
              <ProductCard product={drink} key={drink.id} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild to="/collections">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-br from-brand-black to-brand-black/90 text-brand-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-12">
            <h2 className="font-heading text-4xl text-center">
              Special Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {discountedProducts.map((product) => (
              <div key={product.id} className="relative group">
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-brand-white/10 w-full aspect-square overflow-hidden mb-4 rounded-lg relative">
                    <img
                      src={product.image || ""}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-brand-red text-brand-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      20% OFF
                    </div>
                  </div>
                  <h3 className="text-base font-medium uppercase mb-1 h-12 overflow-hidden text-brand-white">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-brand-white">
                      €{calculateDiscount(product.price)}
                    </p>
                    <p className="text-sm text-brand-white/60 line-through">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
              asChild
              to="/collections"
            >
              Shop All Deals
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
