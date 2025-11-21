import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Coffee, Award, Truck, Tag } from 'lucide-react';
import { useProductsContext } from '../contexts/ProductContext';
import { BlogPost } from '../types';

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

const blogPosts: Omit<BlogPost, 'id' | 'author' | 'date'>[] = [
    { title: 'How to choose the right laptop', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop' },
    { title: 'The ultimate guide to winter fashion', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop' }
];

const HomePage = () => {
    const { categories } = useProductsContext();
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

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
          <img src="src/assets/img/drinks-photo.webp" alt="Featured products" className="w-full lg:h-[80vh] object-cover rounded-3xl"/>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {categories.slice(0, 8).map(cat => (
                <Link to={`/collections?category=${cat.name}`} key={cat.id} className="group">
                    <div className="bg-brand-gray-light aspect-square overflow-hidden rounded-2xl">
                        <img src={categoryImages[cat.name] || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400.png'} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                    <h3 className="mt-4 font-semibold uppercase tracking-wider capitalize">{cat.name}</h3>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-brand-gray-light py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl mb-12">Last Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {blogPosts.map(post => (
                    <div key={post.title} className="bg-brand-white text-left flex flex-col sm:flex-row items-center gap-6">
                        <img src={post.image} alt={post.title} className="w-full sm:w-1/2 h-64 object-cover" />
                        <div className="p-6 sm:p-0 sm:pr-6 flex-1">
                            <h3 className="font-semibold text-xl uppercase mb-3">{post.title}</h3>
                            <p className="text-sm text-brand-black/70 mb-4">{post.description}</p>
                            <Button variant="link" className="p-0 h-auto text-brand-black font-semibold">Read More</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Wholesalers Section */}
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-end py-20 relative">
        <div className="lg:absolute lg:left-0 lg:top-0 lg:w-1/2 h-64 lg:h-full w-full mb-8 lg:mb-0">
            <img src="https://images.unsplash.com/photo-1579226905180-636b76d96a82?q=80&w=1887&auto=format&fit=crop" alt="Wholesale" className="w-full h-full object-cover" />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left z-10 p-8">
          <h2 className="font-heading text-4xl md:text-5xl text-brand-black mb-6">For Wholesalers</h2>
          <p className="text-brand-black/80 mb-8 max-w-md mx-auto lg:mx-0">We offer bulk pricing and partnerships. With a wide choice of products, we can make a sophisticated selection that fits exactly in your kind of establishment.</p>
          <Button variant="outline">Get a free consultation</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
