import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct, useProducts } from '../hooks/useProducts';
import { Button } from '../components/ui/Button';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id!);
  const { products: allProducts } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) return <div className="container mx-auto text-center py-40">Loading Product...</div>;
  if (error || !product) return <div className="container mx-auto text-center py-40 text-red-500">Product not found.</div>;

  const relatedProducts = allProducts.filter(p => p.category.id === product.category.id && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <p className="text-sm uppercase tracking-wider text-brand-black/70 mb-8">
        <Link to="/" className="hover:text-brand-black">Home</Link> / 
        <Link to="/collections" className="hover:text-brand-black"> Collections</Link> / 
        <span className="capitalize"> {product.title}</span>
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
        <div className="bg-brand-gray-light p-4">
          <img src={product.image || ''} alt={product.title} className="w-full h-full object-contain aspect-square" />
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wider text-brand-black/60 mb-2">{product.category.name}</span>
          <h1 className="font-heading text-4xl mb-4">{product.title}</h1>
          <p className="text-brand-black/70 mb-4">{product.description}</p>
          <p className="font-heading text-4xl mb-6">€{product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center border border-brand-black rounded">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Minus size={20} /></button>
              <span className="px-6 text-lg font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-3"><Plus size={20} /></button>
            </div>
            <Button onClick={handleAddToCart} className="flex-grow">
              <ShoppingBag size={20} className="mr-2"/> Add to Bag
            </Button>
          </div>
          <div className="text-sm text-brand-black/60">
            {product.rating?.count} reviews | Rating: {product.rating?.rate}/5
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-brand-gray">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl mb-12">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
