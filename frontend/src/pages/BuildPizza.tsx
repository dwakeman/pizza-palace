import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Button,
  Loading,
  InlineNotification,
  Heading,
} from '@carbon/react';
import { Add, ShoppingCart } from '@carbon/icons-react';

import { Pizza, PizzaSize, MenuData, Order } from '../types';
import { menuApi, orderApi } from '../services/api';

import SizeSelector from '../components/PizzaBuilder/SizeSelector';
import CrustSelector from '../components/PizzaBuilder/CrustSelector';
import ToppingSelector from '../components/PizzaBuilder/ToppingSelector';
import PizzaSummary from '../components/PizzaBuilder/PizzaSummary';
import CustomerInfo from '../components/OrderForm/CustomerInfo';
import OrderConfirmation from '../components/OrderForm/OrderConfirmation';

const BuildPizza: React.FC = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Pizza state
  const [currentPizza, setCurrentPizza] = useState<Pizza>({
    size: PizzaSize.MEDIUM,
    crust_type: '',
    toppings: [],
  });

  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  // Customer info state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Order confirmation
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      const data = await menuApi.getMenuData();
      setMenuData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load menu data. Please try again.');
      console.error('Error loading menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPizzaToOrder = () => {
    if (!currentPizza.crust_type) {
      setError('Please select a crust type');
      return;
    }

    setPizzas([...pizzas, { ...currentPizza }]);
    setCurrentPizza({
      size: PizzaSize.MEDIUM,
      crust_type: '',
      toppings: [],
    });
    setError(null);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.name = 'Name is required';
    }

    const phoneDigits = customerPhone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      errors.phone = 'Phone number must be 10 digits';
    }

    if (!customerAddress.trim()) {
      errors.address = 'Address is required';
    }

    if (pizzas.length === 0) {
      setError('Please add at least one pizza to your order');
      return false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitOrder = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const order: Order = {
        customer_name: customerName,
        customer_phone: customerPhone.replace(/\D/g, ''),
        customer_address: customerAddress,
        pizzas: pizzas,
      };

      const result = await orderApi.createOrder(order);
      setConfirmedOrder(result);
      setShowConfirmation(true);

      // Reset form
      setPizzas([]);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCurrentPizza({
        size: PizzaSize.MEDIUM,
        crust_type: '',
        toppings: [],
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to submit order. Please try again.');
      console.error('Error submitting order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading description="Loading menu..." />;
  }

  if (!menuData) {
    return (
      <InlineNotification
        kind="error"
        title="Error"
        subtitle={error || 'Failed to load menu data'}
      />
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <Heading style={{ marginBottom: '2rem' }}>Build Your Pizza</Heading>
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

        {/* Pizza Builder */}
        <Column lg={8} md={4} sm={4}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Customize Your Pizza</h3>

            <SizeSelector
              selectedSize={currentPizza.size}
              sizes={menuData.sizes}
              onChange={(size) => setCurrentPizza({ ...currentPizza, size })}
            />

            <div style={{ marginTop: '1.5rem' }}>
              <CrustSelector
                selectedCrust={currentPizza.crust_type}
                crusts={menuData.crusts}
                onChange={(crust) => setCurrentPizza({ ...currentPizza, crust_type: crust })}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <ToppingSelector
                selectedToppings={currentPizza.toppings}
                toppings={menuData.toppings}
                onChange={(toppings) => setCurrentPizza({ ...currentPizza, toppings })}
              />
            </div>

            <Button
              renderIcon={Add}
              onClick={addPizzaToOrder}
              style={{ marginTop: '1.5rem' }}
            >
              Add Pizza to Order
            </Button>
          </div>
        </Column>

        {/* Current Pizza Summary */}
        <Column lg={8} md={4} sm={4}>
          <PizzaSummary pizza={currentPizza} menuData={menuData} />

          {pizzas.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h4>Pizzas in Order ({pizzas.length})</h4>
              {pizzas.map((pizza, index) => (
                <PizzaSummary key={index} pizza={pizza} menuData={menuData} />
              ))}
            </div>
          )}
        </Column>

        {/* Customer Information */}
        {pizzas.length > 0 && (
          <>
            <Column lg={16} md={8} sm={4}>
              <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
              <h3 style={{ marginBottom: '1rem' }}>Delivery Information</h3>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <CustomerInfo
                customerName={customerName}
                customerPhone={customerPhone}
                customerAddress={customerAddress}
                onNameChange={setCustomerName}
                onPhoneChange={setCustomerPhone}
                onAddressChange={setCustomerAddress}
                errors={formErrors}
              />
            </Column>

            <Column lg={16} md={8} sm={4}>
              <Button
                renderIcon={ShoppingCart}
                onClick={submitOrder}
                disabled={submitting}
                style={{ marginTop: '1.5rem' }}
                size="lg"
              >
                {submitting ? 'Submitting...' : 'Place Order'}
              </Button>
            </Column>
          </>
        )}
      </Grid>

      <OrderConfirmation
        open={showConfirmation}
        order={confirmedOrder}
        onClose={() => {
          setShowConfirmation(false);
          navigate('/track');
        }}
      />
    </div>
  );
};

export default BuildPizza;

// Made with Bob
