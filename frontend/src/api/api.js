// API configuration and Axios instance
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Product API calls
export const productAPI = {
  getAllProducts: (filters = {}) => api.get('/products', { params: filters }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Order API calls
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/user/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  getAllOrders: () => api.get('/orders'),
};

// User API calls
export const userAPI = {
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (data) => api.put('/users/profile', data),
  getAllUsers: () => api.get('/users/admin/all-users'),
  getDashboardStats: () => api.get('/users/admin/stats'),
};

export default api;
