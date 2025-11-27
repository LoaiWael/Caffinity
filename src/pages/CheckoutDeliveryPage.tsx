import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';

const InputField = ({ label, type = 'text', placeholder }: { label: string, type?: string, placeholder: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-brand-gray rounded-md focus:ring-brand-black focus:border-brand-black"
        />
    </div>
);

const CheckoutDeliveryPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

    const { totalPrice } = useCart();

    return (
        <div className="bg-brand-gray-light min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-12">
                    <Link to="/cart" className="font-semibold text-lg md:text-xl uppercase text-brand-black/70 hover:text-brand-black">1. My Bag</Link>
                    <div className="flex-grow h-px bg-brand-black"></div>
                    <span className="text-lg md:text-xl uppercase font-semibold">2. Delivery</span>
                    <div className="flex-grow h-px bg-brand-gray-dark"></div>
                    <span className="text-lg md:text-xl uppercase text-brand-gray-dark">3. Review & Payment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 bg-white p-8 space-y-6">
                        <h2 className="font-heading text-2xl">Shipping Address</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField label="First Name" placeholder="Enter your first name" />
                            <InputField label="Last Name" placeholder="Enter your last name" />
                        </div>
                        <InputField label="Street and house number" placeholder="Enter your address" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField label="Postcode" placeholder="Enter your postcode" />
                            <InputField label="City" placeholder="Enter your city" />
                        </div>
                        <InputField label="Country" placeholder="Select your country" />
                        
                        <div className="pt-8">
                            <h2 className="font-heading text-2xl mb-4">Billing Address</h2>
                            <label className="flex items-center gap-3">
                                <input type="checkbox" className="h-4 w-4 rounded border-brand-black text-brand-black focus:ring-brand-black" />
                                <span>Bill to a different address</span>
                            </label>
                        </div>
                        
                        <div className="pt-8">
                            <h2 className="font-heading text-2xl mb-4">Contact Information</h2>
                            <InputField label="Email Address" type="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 h-fit">
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
                            <Button asChild to="/checkout/payment" className="w-full mt-4">Go to payment</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutDeliveryPage;
