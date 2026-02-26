import React from 'react';
import { Tile, Tag, ProgressIndicator, ProgressStep } from '@carbon/react';
import { Order, OrderStatus as OrderStatusEnum } from '../../types';

interface OrderStatusProps {
  order: Order;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
  const getStatusIndex = (status: OrderStatusEnum): number => {
    const statusOrder = [
      OrderStatusEnum.OPEN,
      OrderStatusEnum.PREPARING,
      OrderStatusEnum.OUT_FOR_DELIVERY,
      OrderStatusEnum.DELIVERED,
    ];
    return statusOrder.indexOf(status);
  };

  const getStatusColor = (status: OrderStatusEnum): 'blue' | 'green' | 'red' | 'gray' => {
    switch (status) {
      case OrderStatusEnum.OPEN:
        return 'blue';
      case OrderStatusEnum.PREPARING:
        return 'blue';
      case OrderStatusEnum.OUT_FOR_DELIVERY:
        return 'blue';
      case OrderStatusEnum.DELIVERED:
        return 'green';
      case OrderStatusEnum.CANCELLED:
        return 'red';
      default:
        return 'gray';
    }
  };

  const currentIndex = getStatusIndex(order.status!);

  return (
    <Tile style={{ marginBottom: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Order #{order.id?.slice(0, 8)}</h4>
          <Tag type={getStatusColor(order.status!)}>
            {order.status?.replace(/_/g, ' ').toUpperCase()}
          </Tag>
        </div>
        <p style={{ color: '#525252', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Placed: {new Date(order.created_at!).toLocaleString()}
        </p>
      </div>

      {order.status !== OrderStatusEnum.CANCELLED && (
        <ProgressIndicator currentIndex={currentIndex} spaceEqually>
          <ProgressStep label="Order Received" />
          <ProgressStep label="Preparing" />
          <ProgressStep label="Out for Delivery" />
          <ProgressStep label="Delivered" />
        </ProgressIndicator>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <h5>Order Details</h5>
        <p><strong>Customer:</strong> {order.customer_name}</p>
        <p><strong>Phone:</strong> {order.customer_phone}</p>
        <p><strong>Address:</strong> {order.customer_address}</p>
        <p><strong>Total:</strong> ${order.total_price?.toFixed(2)}</p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h5>Pizzas ({order.pizzas.length})</h5>
        {order.pizzas.map((pizza, index) => (
          <div key={index} style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
            <p><strong>Pizza {index + 1}:</strong> {pizza.size} - {pizza.crust_type.replace(/_/g, ' ')}</p>
            {pizza.toppings.length > 0 && (
              <p style={{ fontSize: '0.875rem', color: '#525252' }}>
                Toppings: {pizza.toppings.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </Tile>
  );
};

export default OrderStatus;

// Made with Bob
