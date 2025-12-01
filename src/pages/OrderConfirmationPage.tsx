import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const orderId = location.state?.orderId;

  return (
    <>
      <title>Order Placed !</title>

      <div className="container mx-auto px-6 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="font-heading text-4xl mb-4">Thank You For Your Order!</h1>
        <p className="text-lg text-brand-black/70 mb-2 max-w-md">
          Your payment was successful and your order is being prepared. You will receive a confirmation email shortly.
        </p>
        {orderId && <p className="text-sm text-brand-black/60 mb-8">Order ID: #{orderId}</p>}
        <div className="flex gap-4">
          <Button asChild to="/collections">
            Continue Shopping
          </Button>
          <Button asChild to="/account" variant="outline">
            View Orders
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
