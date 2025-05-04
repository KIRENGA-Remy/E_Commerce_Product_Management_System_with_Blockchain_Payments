import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="relative pb-48 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.productName}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-product.jpg'
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.productName}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;