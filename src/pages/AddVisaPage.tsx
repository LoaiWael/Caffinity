import React, { useState } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';

export default function VisaPaymentForm() {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const { clearCart } = useCart();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardData({ ...cardData, cardNumber: value });
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleCardHolderChange = (e) => {
    const value = e.target.value;
    setCardData({ ...cardData, cardHolder: value });
    setErrors({ ...errors, cardHolder: '' });
  };

  const handleCVVChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCardData({ ...cardData, cvv: value });
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validateCard = () => {
    const newErrors = {};

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

    setTimeout(() => {
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
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-brand-black mb-2">Payment Details</h2>
          <p className="text-brand-gray-dark text-sm">Enter your card information to complete your order</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formatCardNumber(cardData.cardNumber)}
                onChange={handleCardNumberChange}
                placeholder="4111 1111 1111 1111"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-black focus:border-transparent outline-none transition ${
                  errors.cardNumber ? 'border-red-500' : 'border-brand-gray'
                }`}
              />
              <CreditCard className="absolute right-4 top-3.5 w-5 h-5 text-brand-gray-dark" />
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.cardNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardData.cardHolder}
              onChange={handleCardHolderChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-black focus:border-transparent outline-none transition ${
                errors.cardHolder ? 'border-red-500' : 'border-brand-gray'
              }`}
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.cardHolder}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Month
              </label>
              <select
                value={cardData.expiryMonth}
                onChange={(e) => {
                  setCardData({ ...cardData, expiryMonth: e.target.value });
                  setErrors({ ...errors, expiryMonth: '' });
                }}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-brand-black focus:border-transparent outline-none transition ${
                  errors.expiryMonth ? 'border-red-500' : 'border-brand-gray'
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
              <label className="block text-sm font-medium text-brand-black mb-2">
                Year
              </label>
              <select
                value={cardData.expiryYear}
                onChange={(e) => {
                  setCardData({ ...cardData, expiryYear: e.target.value });
                  setErrors({ ...errors, expiryYear: '' });
                }}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-brand-black focus:border-transparent outline-none transition ${
                  errors.expiryYear ? 'border-red-500' : 'border-brand-gray'
                }`}
              >
                <option value="">YYYY</option>
                {generateYearOptions().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={handleCVVChange}
                placeholder="123"
                maxLength="3"
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-brand-black focus:border-transparent outline-none transition ${
                  errors.cvv ? 'border-red-500' : 'border-brand-gray'
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
            className={`w-full py-3 rounded-lg font-semibold text-white transition mt-6 ${
              isProcessing
                ? 'bg-brand-gray cursor-not-allowed'
                : 'bg-brand-black hover:bg-brand-black/90'
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
        </div>
      </div>
    </div>
  );
}