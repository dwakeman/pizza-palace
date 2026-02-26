import React from 'react';
import { Modal, Button } from '@carbon/react';
import { CheckmarkFilled } from '@carbon/icons-react';
import { Order } from '../../types';

interface OrderConfirmationProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ open, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal
      open={open}
      onRequestClose={onClose}
      modalHeading="Order Confirmed!"
      primaryButtonText="Close"
      onRequestSubmit={onClose}
      size="sm"
    >
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <CheckmarkFilled size={64} style={{ color: '#24a148', marginBottom: '1rem' }} />
        
        <h3 style={{ marginBottom: '1rem' }}>Thank you for your order!</h3>
        
        <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer_name}</p>
          <p><strong>Phone:</strong> {order.customer_phone}</p>
          <p><strong>Address:</strong> {order.customer_address}</p>
          <p><strong>Total:</strong> ${order.total_price?.toFixed(2)}</p>
        </div>

        <p style={{ color: '#525252', fontSize: '0.875rem' }}>
          You can track your order status using your phone number.
        </p>
      </div>
    </Modal>
  );
};

export default OrderConfirmation;

// Made with Bob
