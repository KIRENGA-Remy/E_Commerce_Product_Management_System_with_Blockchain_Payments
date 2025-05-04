import axios from 'axios';
import { Order } from '../models/index.js';
import { convertToBTC } from '../utils/currency.js';

// Payment gateway config
const PAYMENT_PROVIDERS = {
  BITPAY: {
    apiUrl: process.env.BITPAY_API_URL,
    apiKey: process.env.BITPAY_API_KEY
  },
  STRIPE: {
    apiKey: process.env.STRIPE_API_KEY
  }
};

export const initiatePayment = async (req, res) => {
  const { orderId, currency } = req.body; // currency: 'USD' or 'BTC'
  const userId = req.user.id;

  try {
    const order = await Order.findByPk(orderId, {
      include: ['Products']
    });

    if (!order || order.userId !== userId) {
      return res.status(404).json({ error: 'Order not found' });
    }

    let paymentResult;
    if (currency === 'BTC') {
      paymentResult = await processBitcoinPayment(order);
    } else {
      paymentResult = await processStripePayment(order);
    }

    res.json(paymentResult);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

// Process Bitcoin payment via BitPay
const processBitcoinPayment = async (order) => {
  // Get current BTC price
  const btcAmount = await convertToBTC(order.totalAmount);
  
  // Create BitPay invoice
  const response = await axios.post(
    `${PAYMENT_PROVIDERS.BITPAY.apiUrl}/invoices`,
    {
      price: order.totalAmount,
      currency: 'USD',
      bitcoinAmount: btcAmount,
      orderId: order.id,
      notificationURL: `${process.env.BASE_URL}/api/payments/webhook/bitpay`,
      redirectURL: `${process.env.FRONTEND_URL}/orders/${order.id}`
    },
    {
      headers: {
        'X-Accept-Version': '2.0.0',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYMENT_PROVIDERS.BITPAY.apiKey}`
      }
    }
  );

  return {
    paymentType: 'BTC',
    paymentUrl: response.data.url,
    bitcoinAmount: btcAmount,
    bitcoinAddress: response.data.bitcoinAddress,
    expiry: response.data.expirationTime
  };
};

// Process USD payment via Stripe
const processStripePayment = async (order) => {
  const stripe = require('stripe')(PAYMENT_PROVIDERS.STRIPE.apiKey);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: order.Products.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.productName,
        },
        unit_amount: Math.round(product.price * 100), // cents
      },
      quantity: product.OrderItem.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/orders/${order.id}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=true`,
    metadata: { orderId: order.id }
  });

  return {
    paymentType: 'USD',
    paymentUrl: session.url
  };
};