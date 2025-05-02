import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';
import RecentOrders from '../../components/admin/RecentOrders';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Products" 
            value={stats.totalProducts} 
            icon="📦"
          />
          <StatsCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon="🛒"
          />
          <StatsCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="👥"
          />
          <StatsCard 
            title="Total Revenue" 
            value={`$${stats.revenue.toFixed(2)}`} 
            icon="💰"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;