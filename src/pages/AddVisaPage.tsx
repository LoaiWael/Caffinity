import React, { useState } from 'react';
import { CreditCard, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import type { Order, OrderItem } from '../types';

export default function VisaPaymentForm() {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const { clearCart, cartItems, totalPrice } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const shippingAddress = location.state?.shippingAddress;
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardHolder?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvv?: string;
  }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardData({ ...cardData, cardNumber: value });
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z\s]*$/.test(value)) {
      setCardData({ ...cardData, cardHolder: value });
      setErrors({ ...errors, cardHolder: '' });
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCardData({ ...cardData, cvv: value });
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validateCard = () => {
    const newErrors: {
      cardNumber?: string;
      cardHolder?: string;
      expiryMonth?: string;
      expiryYear?: string;
      cvv?: string;
    } = {};

    if (!cardData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardData.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    } else if (!cardData.cardNumber.startsWith('4')) {
      newErrors.cardNumber = 'Must be a valid Visa card (starts with 4)';
    }

    if (!cardData.cardHolder) {
      newErrors.cardHolder = 'Cardholder name is required';
    } else if (cardData.cardHolder.length < 3) {
      newErrors.cardHolder = 'Name must be at least 3 characters';
    }

    if (!cardData.expiryMonth) {
      newErrors.expiryMonth = 'Month required';
    }
    if (!cardData.expiryYear) {
      newErrors.expiryYear = 'Year required';
    }

    if (cardData.expiryMonth && cardData.expiryYear) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const expYear = parseInt(cardData.expiryYear);
      const expMonth = parseInt(cardData.expiryMonth);

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryMonth = 'Card expired';
        newErrors.expiryYear = 'Card expired';
      }
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save order to localStorage
      if (user) {
        const orderItems: OrderItem[] = cartItems.map((item, index) => ({
          id: index + 1,
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        }));

        const newOrder: Order = {
          id: orderId,
          userId: user.id,
          created_at: new Date().toISOString(),
          total_amount: totalPrice,
          status: 'processing',
          shipping_address: shippingAddress || null,
          order_items: orderItems,
        };

        // Get existing orders and add new one
        const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
        allOrders.push(newOrder);
        localStorage.setItem('all_orders', JSON.stringify(allOrders));
      }

      setIsProcessing(false);
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/order-confirmation', {
        state: { orderId }
      });
    }, 2000);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 15; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  return (
    <>
      <title>Caffinity - Add Visa</title>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                    <CreditCard className="w-10 h-10 text-white/80" />
                  </div>

                  <div className="mb-6">
                    <p className="text-2xl tracking-wider font-mono">
                      {formatCardNumber(cardData.cardNumber) || '•••• •••• •••• ••••'}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/60 mb-1">Card Holder</p>
                      <p className="font-medium">{cardData.cardHolder || 'YOUR NAME'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Expires</p>
                      <p className="font-medium">
                        {cardData.expiryMonth || 'MM'}/{cardData.expiryYear ? cardData.expiryYear.slice(-2) : 'YY'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/80">
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> SSL Encrypted
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> PCI DSS Compliant
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Money Back Guarantee
                </p>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Details</h2>
              <p className="text-gray-600 mb-6">Complete your order by providing payment details</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formatCardNumber(cardData.cardNumber)}
                      onChange={handleCardNumberChange}
                      placeholder="4111 1111 1111 1111"
                      className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardData.cardHolder}
                      onChange={handleCardHolderChange}
                      placeholder="JOHN DOE"
                      className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.cardHolder && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cardHolder}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Month
                    </label>
                    <select
                      value={cardData.expiryMonth}
                      onChange={(e) => {
                        setCardData({ ...cardData, expiryMonth: e.target.value });
                        setErrors({ ...errors, expiryMonth: '' });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      value={cardData.expiryYear}
                      onChange={(e) => {
                        setCardData({ ...cardData, expiryYear: e.target.value });
                        setErrors({ ...errors, expiryYear: '' });
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.expiryYear ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="">YYYY</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardData.cvv}
                      onChange={handleCVVChange}
                      placeholder="123"
                      maxLength={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                  </div>
                </div>
                {(errors.expiryMonth || errors.expiryYear || errors.cvv) && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.expiryMonth || errors.expiryYear || errors.cvv}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition transform ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By confirming your payment, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}