import axios from 'axios';
import { Order, OrderStatus, MenuData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderApi = {
  // Create a new order
  createOrder: async (orderData: Order): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get orders by phone number
  getOrdersByPhone: async (phone: string): Promise<Order[]> => {
    const response = await api.get(`/orders/phone/${phone}`);
    return response.data;
  },

  // Get all open orders
  getOpenOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/open');
    return response.data;
  },

  // Get specific order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export const menuApi = {
  // Get all available toppings
  getToppings: async () => {
    const response = await api.get('/menu/toppings');
    return response.data;
  },

  // Get all available crust types
  getCrusts: async () => {
    const response = await api.get('/menu/crusts');
    return response.data;
  },

  // Get all available sizes
  getSizes: async () => {
    const response = await api.get('/menu/sizes');
    return response.data;
  },

  // Get all menu data at once
  getMenuData: async (): Promise<MenuData> => {
    const [toppings, crusts, sizes] = await Promise.all([
      menuApi.getToppings(),
      menuApi.getCrusts(),
      menuApi.getSizes(),
    ]);
    return { toppings, crusts, sizes };
  },
};

export default api;

// Made with Bob
