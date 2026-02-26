import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Column, Heading } from '@carbon/react';
import { ShoppingCart, Receipt } from '@carbon/icons-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page" style={{ padding: '2rem' }}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Heading style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              🍕 Welcome to Pizza Palace
            </Heading>
            <p style={{ fontSize: '1.25rem', color: '#525252' }}>
              Build your perfect pizza and get it delivered fresh to your door!
            </p>
          </div>
        </Column>

        <Column lg={8} md={4} sm={4}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            <ShoppingCart size={48} style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Order Pizza</h3>
            <p style={{ marginBottom: '1.5rem', color: '#525252' }}>
              Customize your pizza with your favorite toppings, crust, and size.
            </p>
            <Button onClick={() => navigate('/build')} size="lg">
              Start Building
            </Button>
          </div>
        </Column>

        <Column lg={8} md={4} sm={4}>
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            <Receipt size={48} style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Track Order</h3>
            <p style={{ marginBottom: '1.5rem', color: '#525252' }}>
              Check the status of your order using your phone number.
            </p>
            <Button kind="secondary" onClick={() => navigate('/track')} size="lg">
              Track Order
            </Button>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Our Menu</h2>
            <Grid>
              <Column lg={5} md={4} sm={4}>
                <div style={{ padding: '1rem' }}>
                  <h4>Sizes</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>Small - $8.99</li>
                    <li>Medium - $12.99</li>
                    <li>Large - $16.99</li>
                  </ul>
                </div>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <div style={{ padding: '1rem' }}>
                  <h4>Crust Types</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>Thin Crust</li>
                    <li>New York Style</li>
                    <li>Deep Dish</li>
                    <li>Cheese Stuffed</li>
                    <li>Gluten Free</li>
                  </ul>
                </div>
              </Column>
              <Column lg={6} md={4} sm={4}>
                <div style={{ padding: '1rem' }}>
                  <h4>Toppings (+$1.50 each)</h4>
                  <p style={{ color: '#525252' }}>
                    Pepperoni, Sausage, Ham, Bacon, Chicken, Mushrooms, Peppers,
                    Onions, Olives, Tomatoes, Spinach, Jalapeños, Pineapple, and more!
                  </p>
                </div>
              </Column>
            </Grid>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default Home;

// Made with Bob
