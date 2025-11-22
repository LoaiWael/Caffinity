import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import addToBag from '../assets/svg/add-to-shopping-bag.svg';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const ratingCheck = (bg = false): string => {
    const rating = product.rating.rate;

    if (rating >= 3.5) {
      return bg ? 'bg-brand-green/10' : 'text-brand-green';
    }
    else if (rating >= 2.5) {
      return bg ? 'bg-brand-yellow/10' : 'text-brand-yellow';
    }
    else {
      return bg ? 'bg-brand-red/10' : 'text-brand-red';
    }
  }

  return (
    <div className="group border-2 border-brand-gray/60 rounded-2xl shadow-brand-black/5 shadow-md relative">
      <Link to={`/products/${product.id}`} className="flex flex-col items-start p-3">
        <div className="bg-brand-gray-light w-full aspect-square overflow-hidden mb-4 rounded-lg">
          <img
            src={product.image || ''}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-300"
          />
        </div>
        <h3 className="text-base font-medium uppercase text-brand-black mb-1 h-12 overflow-hidden" title={product.title}>{product.title}</h3>
        <div className={`py-[0.125rem] px-2 mt-1 rounded-lg flex items-center gap-1 ${ratingCheck(true)}`}>
          <small className='font-bold '>{product.rating.rate}</small>
          <Star className={`h-3 w-3 fill-current ${ratingCheck()}`} />
          <small className='ml-[0.125rem]'>({product.rating.count})</small>
        </div>
        <p className="text-base font-semibold text-brand-black mt-1">€{product.price.toFixed(2)}</p>
      </Link>
      <button className=' absolute bottom-3 right-3 bg-brand-gray/50 p-1 rounded-xl border-[1px] border-brand-gray-dark/60 hover:opacity-60 transition-opacity' title='Add to Bag' onClick={() => addToCart(product, 1)}><img className='w-7 aspect-square' src={addToBag} alt="Add to Bag" /></button>
    </div>
  );
};

export default ProductCard;
