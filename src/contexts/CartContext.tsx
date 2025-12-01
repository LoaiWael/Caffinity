import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Drink } from '../types';
import toast from 'react-hot-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Drink, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(JSON.parse(localStorage.getItem('cart')!) ?? []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    updateLocalStorage();
  }, [cartItems])

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  const addToCart = (product: Drink, quantityToAdd: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }
      return [...prevItems, { ...product, quantity: quantityToAdd }];
    });
    toast.success(`${product.name} added to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.error(`${itemToRemove.name} removed from cart.`);
      }
      return prevItems.filter(item => item.id !== productId)
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
