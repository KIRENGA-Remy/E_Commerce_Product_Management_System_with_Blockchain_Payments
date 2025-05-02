import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              CryptoShop
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
              Products
            </Link>
            
            {currentUser && (
              <Link 
                to={currentUser.role === 'admin' ? '/admin' : '/user'} 
                className="px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>
            )}
            
            {currentUser?.role === 'admin' && (
              <Link to="/admin/products/create" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
                Create Product
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="hidden sm:inline text-gray-700">
                  Hi, {currentUser.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;