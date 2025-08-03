import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Input validation with detailed checks
    const { amount, currency, serviceType, customerInfo } = req.body || {};

    // Comprehensive validation
    if (!amount || typeof amount !== 'number' || amount <= 0 || amount > 10000) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    
    if (!currency || typeof currency !== 'string' || currency.toLowerCase() !== 'eur') {
      return res.status(400).json({ error: 'Invalid currency' });
    }
    
    if (!serviceType || typeof serviceType !== 'string') {
      return res.status(400).json({ error: 'Invalid service type' });
    }
    
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.level || !customerInfo.goals) {
      return res.status(400).json({ error: 'Missing customer information' });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure integer
      currency: currency.toLowerCase(),
      metadata: {
        serviceType,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerLevel: customerInfo.level,
        customerGoals: customerInfo.goals.substring(0, 500), // Stripe metadata has character limits
      },
      description: `Spanish Class: ${serviceType}`,
      receipt_email: customerInfo.email,
    });

    console.log('Payment intent created:', paymentIntent.id);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Don't expose internal Stripe errors to users
    let userMessage = 'Payment processing is temporarily unavailable. Please try again later.';
    let statusCode = 500;
    
    // Handle specific known error types
    if (error.type === 'StripeCardError') {
      userMessage = 'There was an issue with your card. Please check your payment details.';
      statusCode = 400;
    } else if (error.type === 'StripeInvalidRequestError') {
      userMessage = 'Invalid payment request. Please refresh and try again.';
      statusCode = 400;
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      userMessage = 'Payment service is temporarily unavailable. Please try again in a few minutes.';
      statusCode = 503;
    }
    
    res.status(statusCode).json({ 
      error: userMessage
    });
  }
} 