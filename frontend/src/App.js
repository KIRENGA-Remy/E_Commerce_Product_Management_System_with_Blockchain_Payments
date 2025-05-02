import React from 'react'
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import {AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Payment from './pages/Payment';
import AdminDashboard from './pages/admin/Dashboard'
import CreateProduct from './pages/admin/CreateProduct';
import ManageOrders from './pages/admin/ManageOrders';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-grow'>
            <Routes>
              {/* Public Route */}
              <Route path='/' element={<ProductList />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected user routes */}
              <Route path='/user' element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              <Route path='/payment/:orderId' element={<PrivateRoute><Payment /></PrivateRoute>} />

              {/* Admin routes */}
              <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path='/admin/products/create' element={<AdminRoute><CreateProduct /></AdminRoute>} />
              <Route path='/admin/orders' element={<AdminRoute><ManageOrders /></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

// Private route component for authenticated users
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// Admin route component
function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser?.role === 'admin' ? children : <Navigate to="/" />;
}