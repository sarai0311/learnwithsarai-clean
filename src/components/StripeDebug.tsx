import React, { useEffect, useState } from 'react';

const StripeDebug: React.FC = () => {
  const [stripeKey, setStripeKey] = useState<string | undefined>('');
  const [stripeLoaded, setStripeLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    setStripeKey(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    
    // Test if Stripe loads
    import('@/lib/stripe').then((module) => {
      module.default.then((stripe) => {
        setStripeLoaded(!!stripe);
      }).catch(() => {
        setStripeLoaded(false);
      });
    });
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3 className="font-bold mb-2">Stripe Debug Info:</h3>
      <p><strong>Publishable Key Available:</strong> {stripeKey ? `Yes (${stripeKey.substring(0, 20)}...)` : 'No'}</p>
      <p><strong>Stripe Loaded:</strong> {stripeLoaded ? 'Yes' : 'No'}</p>
      <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
    </div>
  );
};

export default StripeDebug;