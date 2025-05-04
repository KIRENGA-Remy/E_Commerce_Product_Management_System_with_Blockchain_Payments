import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const Checkout = ({ order }) => {
  const [paymentMethod, setPaymentMethod] = useState('USD');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/payments/initiate', {
        orderId: order.id,
        currency: paymentMethod
      });
      
      if (paymentMethod === 'USD') {
        window.location.href = response.data.paymentUrl; // Redirect to Stripe
      } else {
        setPaymentInfo(response.data); // Show BTC payment info
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Payment Currency:</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod('USD')}
            className={`px-4 py-2 rounded ${paymentMethod === 'USD' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Pay with USD (Credit Card)
          </button>
          <button
            onClick={() => setPaymentMethod('BTC')}
            className={`px-4 py-2 rounded ${paymentMethod === 'BTC' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Pay with Bitcoin
          </button>
        </div>
      </div>

      {paymentMethod === 'BTC' && paymentInfo && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-bold mb-2">Bitcoin Payment Instructions</h3>
          <p className="mb-2">Amount: {paymentInfo.bitcoinAmount} BTC</p>
          <div className="flex justify-center mb-4">
            <QRCodeSVG 
              value={`bitcoin:${paymentInfo.bitcoinAddress}?amount=${paymentInfo.bitcoinAmount}`}
              size={200}
            />
          </div>
          <p className="break-all bg-gray-100 p-2 rounded text-sm">
            Address: {paymentInfo.bitcoinAddress}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Price locked at: ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>
    </div>
  );
};