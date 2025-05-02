import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import OrderHistory from '../components/OrderHistory';

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/user/${currentUser.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {currentUser.username}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <p><span className="font-medium">Email:</span> {currentUser.email}</p>
        <p><span className="font-medium">Bitcoin Address:</span> {currentUser.bitcoinAddress || 'Not set'}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        {orders.length > 0 ? (
          <OrderHistory orders={orders} />
        ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;