const API = {
    // Auth endpoints
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      me: '/auth/me'
    },
    
    // Product endpoints
    products: {
      getAll: '/products',
      getById: (id) => `/products/${id}`,
      create: '/products',
      update: (id) => `/products/${id}`,
      delete: (id) => `/products/${id}`
    },
    
    // Order endpoints
    orders: {
      create: '/orders',
      getById: (id) => `/orders/${id}`,
      getUserOrders: (userId) => `/orders/user/${userId}`,
      processPayment: (id) => `/orders/${id}/pay`,
      checkPayment: (id) => `/orders/${id}/check-payment`
    },
    
    // Admin endpoints
    admin: {
      stats: '/admin/stats',
      orders: '/admin/orders',
      updateOrder: (id) => `/admin/orders/${id}`
    }
  };
  
  export default API;