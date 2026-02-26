import React, { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  Button,
  Loading,
  InlineNotification,
  Heading,
} from '@carbon/react';
import { Renew } from '@carbon/icons-react';
import { Order, OrderStatus } from '../types';
import { orderApi } from '../services/api';
import OpenOrdersList from '../components/Admin/OpenOrdersList';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await orderApi.getOpenOrders();
      setOrders(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load orders. Please try again.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setError(null);
      
      await orderApi.updateOrderStatus(orderId, status);
      
      // Reload orders to get updated data
      await loadOrders();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update order status. Please try again.');
      console.error('Error updating order:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <Heading>Admin Dashboard</Heading>
            <Button
              renderIcon={Renew}
              onClick={loadOrders}
              disabled={loading}
              kind="secondary"
            >
              Refresh
            </Button>
          </div>
        </Column>

        {error && (
          <Column lg={16} md={8} sm={4}>
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={error}
              onCloseButtonClick={() => setError(null)}
              style={{ marginBottom: '1rem' }}
            />
          </Column>
        )}

        <Column lg={16} md={8} sm={4}>
          {loading ? (
            <Loading description="Loading orders..." />
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.125rem', color: '#525252' }}>
                No open orders at the moment.
              </p>
            </div>
          ) : (
            <>
              <h3 style={{ marginBottom: '1rem' }}>Open Orders ({orders.length})</h3>
              <OpenOrdersList
                orders={orders}
                onStatusUpdate={handleStatusUpdate}
                updating={updatingOrderId}
              />
            </>
          )}
        </Column>
      </Grid>
    </div>
  );
};

export default AdminDashboard;

// Made with Bob
