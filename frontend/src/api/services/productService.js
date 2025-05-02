import api from './axios';
import API from './endpoints';

export const getProducts = async () => {
  const response = await api.get(API.products.getAll);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(API.products.getById(id));
  return response.data;
};

// ... other product-related API calls