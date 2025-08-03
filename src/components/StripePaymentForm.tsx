import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
  Elements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import stripePromise from '@/lib/stripe';

interface PaymentFormProps {
  amount: number;
  serviceType: string;
  customerInfo: {
    name: string;
    email: string;
    level: string;
    goals: string;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  serviceType,
  customerInfo,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card element not found');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount, // Send in euros, backend will convert to cents
          currency: 'eur',
          serviceType,
          customerInfo,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
            },
          },
        }
      );

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      onError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-sarai-primary/10 rounded-full flex items-center justify-center mr-3">
          <CreditCard className="h-5 w-5 text-sarai-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-sarai-text">Payment Details</h3>
          <p className="text-sm text-gray-600">Secure payment powered by Stripe</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-sarai-background/20 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{serviceType}</span>
            <span className="font-bold text-sarai-text">€{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Processing fee</span>
            <span className="text-gray-500">Included</span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-sarai-text">Total</span>
              <span className="text-sarai-primary text-lg">€{amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-sarai-primary hover:bg-sarai-primary/90 text-white py-3 text-lg font-semibold shadow-lg"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Lock className="h-5 w-5 mr-2" />
                Complete Payment €{amount.toFixed(2)}
              </div>
            )}
          </Button>
        </motion.div>

        <div className="flex items-center justify-center text-xs text-gray-500">
          <Lock className="h-3 w-3 mr-1" />
          Your payment information is secure and encrypted
        </div>
      </form>
    </motion.div>
  );
};

// Wrapper component that provides Stripe Elements context
const StripePaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm; 