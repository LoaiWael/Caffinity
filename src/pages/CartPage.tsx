import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { Plus, Minus } from 'lucide-react';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

    return (
        <div className="bg-brand-white min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-12">
                    <span className="font-semibold text-lg md:text-xl uppercase">1. My Bag</span>
                    <div className="flex-grow h-px bg-brand-gray-dark"></div>
                    <span className="text-lg md:text-xl uppercase text-brand-gray-dark">2. Delivery</span>
                    <div className="flex-grow h-px bg-brand-gray-dark"></div>
                    <span className="text-lg md:text-xl uppercase text-brand-gray-dark">3. Review & Payment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 border border-brand-gray">
                                    <img src={item.image} alt={item.title} className="w-full sm:w-32 h-32 object-cover bg-brand-gray-light" />
                                    <div className="flex-grow flex flex-col justify-between">
                                        <h3 className="font-medium leading-tight">{item.title}</h3>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-brand-gray rounded">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={16} /></button>
                                                <span className="px-4 text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={16} /></button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-xs uppercase tracking-wider text-brand-black/50 hover:text-brand-red">Remove</button>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-lg sm:text-right">€{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 border border-brand-gray">
                                <p className="text-brand-black/70">Your cart is empty.</p>
                            </div>
                        )}
                        <Button asChild to="/collections" variant="outline">Back to shopping</Button>
                    </div>
                    
                    <div className="bg-brand-gray-light p-8 h-fit">
                        <h2 className="font-heading text-2xl mb-6">Order summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>€{totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>€3.95</span>
                            </div>
                            <hr className="border-brand-gray-dark my-4"/>
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>€{(totalPrice + 3.95).toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-brand-black/70">Estimated shipping time: 2 days</p>
                            <Button asChild to="/checkout/delivery" className="w-full mt-4">Check out</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
