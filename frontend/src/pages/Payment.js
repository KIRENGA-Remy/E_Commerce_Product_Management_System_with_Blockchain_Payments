import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import QRCode from 'qrcode.react';
import BitcoinService from '../services/BitcoinService';

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [paymentAddress, setPaymentAddress] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`);
        setOrder(response.data);
        
        // Generate or use existing Bitcoin address
        if (!response.data.bitcoinAddress) {
          const { address } = BitcoinService.generateAddress();
          await axios.put(`/orders/${orderId}`, { bitcoinAddress: address });
          setPaymentAddress(address);
        } else {
          setPaymentAddress(response.data.bitcoinAddress);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      }
    };

    fetchOrder();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [orderId]);

  useEffect(() => {
    if (paymentAddress && !isPaid) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`/orders/${orderId}/check-payment`);
          if (response.data.isPaid) {
            setIsPaid(true);
            clearInterval(interval);
            toast.success('Payment confirmed! Your order is being processed.');
            navigate('/orders');
          }
        } catch (error) {
          console.error('Error checking payment:', error);
        }
      }, 15000); // Check every 15 seconds
      
      setTimer(interval);
    }
  }, [paymentAddress, isPaid, orderId, navigate]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="mb-2">Total Amount: ${order.totalAmount}</p>
        <p className="mb-4">Bitcoin Amount: {order.bitcoinAmount} BTC</p>
        
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
          <p className="mb-4">Send exactly {order.bitcoinAmount} BTC to the address below:</p>
          
          <div className="flex flex-col items-center mb-6">
            <QRCode value={`bitcoin:${paymentAddress}?amount=${order.bitcoinAmount}`} size={200} />
            <div className="mt-4 p-3 bg-gray-100 rounded break-all text-sm">
              {paymentAddress}
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            After payment is confirmed, you'll be automatically redirected. This may take a few minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;