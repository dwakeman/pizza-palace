import React, { useState } from 'react';
import {
  Grid,
  Column,
  TextInput,
  Button,
  Loading,
  InlineNotification,
  Heading,
} from '@carbon/react';
import { Search } from '@carbon/icons-react';
import { Order } from '../types';
import { orderApi } from '../services/api';
import OrderStatus from '../components/OrderTracking/OrderStatus';

const TrackOrder: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);

      const result = await orderApi.getOrdersByPhone(phoneNumber);
      setOrders(result);

      if (result.length === 0) {
        setError('No orders found for this phone number');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <Heading style={{ marginBottom: '2rem' }}>Track Your Order</Heading>
        </Column>

        <Column lg={8} md={4} sm={4}>
          <TextInput
            id="phone-search"
            labelText="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            helperText="Enter the phone number used when placing the order"
          />
          <Button
            renderIcon={Search}
            onClick={handleSearch}
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Searching...' : 'Search Orders'}
          </Button>
        </Column>

        <Column lg={16} md={8} sm={4}>
          {loading && (
            <div style={{ marginTop: '2rem' }}>
              <Loading description="Loading orders..." />
            </div>
          )}

          {error && searched && (
            <InlineNotification
              kind={orders.length === 0 ? 'warning' : 'error'}
              title={orders.length === 0 ? 'No Orders Found' : 'Error'}
              subtitle={error}
              onCloseButtonClick={() => setError(null)}
              style={{ marginTop: '2rem' }}
            />
          )}

          {!loading && orders.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Your Orders ({orders.length})</h3>
              {orders.map((order) => (
                <OrderStatus key={order.id} order={order} />
              ))}
            </div>
          )}

          {!loading && searched && orders.length === 0 && !error && (
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#525252' }}>
                No orders found for this phone number. Please check the number and try again.
              </p>
            </div>
          )}
        </Column>
      </Grid>
    </div>
  );
};

export default TrackOrder;

// Made with Bob
