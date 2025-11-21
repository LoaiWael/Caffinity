import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Coffee, Award, Truck, Tag, Star, Percent } from 'lucide-react';
import { useProductsContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const features = [
  { icon: Coffee, text: 'WIDE SELECTION' },
  { icon: Award, text: 'TOP QUALITY PRODUCTS' },
  { icon: Truck, text: 'FREE DELIVERY' },
  { icon: Tag, text: 'GREAT DEALS' },
];

const categoryImages: { [key: string]: string } = {
  "electronics": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop",
  "jewelery": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop",
  "men's clothing": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1740&auto=format&fit=crop",
  "women's clothing": "https://images.unsplash.com/photo-1576185433388-958c2b598585?q=80&w=1887&auto=format&fit=crop",
  "books": "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop",
  "home": "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070&auto=format&fit=crop",
  "sports": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
  "toys": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop",
};


const HomePage = () => {
  const { categories, products } = useProductsContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const mostPopularProducts = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 8);

  const discountedProducts = [...products]
    .filter(p => p.rating.rate >= 4.0)
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
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-black mb-6">Taste the perfect moment.</h1>
          <p className="text-brand-black/80 mb-8 max-w-md mx-auto lg:mx-0">Your daily dose of delicious. Shop the finest coffees and teas, delivered right to your door.</p>
          <Button asChild to="/collections">Browse Collections</Button>
        </div>
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full w-full mt-8 lg:mt-0 px-4 h-auto">
          <img src="src/assets/img/drinks-photo.webp" alt="Featured products" className="w-full lg:h-[80vh] object-cover rounded-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-brand-gray-light py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <feature.icon className="h-8 w-8 text-brand-black" />
                <p className="font-semibold text-sm uppercase tracking-wider">{feature.text}</p>
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
            {categories.slice(0, 8).map(cat => (
              <Link to={`/collections?category=${cat.name}`} key={cat.id} className="group">
                <div className="bg-brand-gray-light aspect-square overflow-hidden rounded-full max-w-48">
                  <img src={categoryImages[cat.name] || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400.png'} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="mt-4 font-semibold tracking-wider capitalize">{cat.name}</h3>
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
            {mostPopularProducts.map(product => (
              <ProductCard product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild to="/collections">View All Products</Button>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-br from-brand-black to-brand-black/90 text-brand-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-12">
            <h2 className="font-heading text-4xl text-center">Special Offers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {discountedProducts.map(product => (
              <div key={product.id} className="relative group">
                <Link to={`/products/${product.id}`} className="flex flex-col items-center text-center">
                  <div className="bg-brand-white/10 w-full aspect-square overflow-hidden mb-4 rounded-lg relative">
                    <img
                      src={product.image || ''}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-brand-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      20% OFF
                    </div>
                  </div>
                  <h3 className="text-base font-medium uppercase mb-1 h-12 overflow-hidden text-brand-white">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-brand-white">€{calculateDiscount(product.price)}</p>
                    <p className="text-sm text-brand-white/60 line-through">€{product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black" asChild to="/collections">
              Shop All Deals
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
