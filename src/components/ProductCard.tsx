import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <motion.div
      whileHover={{ y: -5 }}
      className="group border-[1px] border-brand-gray rounded-xl p-3 shadow-brand-black/5 shadow-md"
    >
      <Link to={`/products/${product.id}`} className="flex flex-col items-start">
        <div className="bg-brand-gray-light w-full aspect-square overflow-hidden mb-4 rounded-lg">
          <img
            src={product.image || ''}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-base font-medium uppercase text-brand-black mb-1 h-12 overflow-hidden">{product.title}</h3>
        <div className={`py-[0.125rem] px-2 rounded-lg flex items-center gap-1 ${ratingCheck(true)}`}>
          <small className='font-bold '>{product.rating.rate}</small>
          <Star className={`h-3 w-3 fill-current ${ratingCheck()}`} />
          <small className='ml-[0.125rem]'>({product.rating.count})</small>
        </div>
        <p className="text-base font-semibold text-brand-black mt-1">€{product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
