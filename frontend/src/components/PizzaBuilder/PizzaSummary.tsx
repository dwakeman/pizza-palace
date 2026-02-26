import React from 'react';
import { Tile, Tag } from '@carbon/react';
import { Pizza, MenuData } from '../../types';

interface PizzaSummaryProps {
  pizza: Pizza;
  menuData: MenuData;
}

const PizzaSummary: React.FC<PizzaSummaryProps> = ({ pizza, menuData }) => {
  const calculatePrice = (): number => {
    let price = 0;

    // Base price for size
    if (pizza.size && menuData.sizes[pizza.size]) {
      price += menuData.sizes[pizza.size].base_price;
    }

    // Crust modifier
    if (pizza.crust_type && menuData.crusts[pizza.crust_type]) {
      price += menuData.crusts[pizza.crust_type].price_modifier;
    }

    // Toppings
    pizza.toppings.forEach((topping) => {
      if (menuData.toppings[topping]) {
        price += menuData.toppings[topping].price;
      }
    });

    return price;
  };

  const price = calculatePrice();

  return (
    <Tile style={{ marginTop: '2rem' }}>
      <h4 style={{ marginBottom: '1rem' }}>Pizza Summary</h4>
      
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Size:</strong>{' '}
        {pizza.size && menuData.sizes[pizza.size]
          ? menuData.sizes[pizza.size].display_name
          : 'Not selected'}
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Crust:</strong>{' '}
        {pizza.crust_type && menuData.crusts[pizza.crust_type]
          ? menuData.crusts[pizza.crust_type].display_name
          : 'Not selected'}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Toppings:</strong>
        {pizza.toppings.length > 0 ? (
          <div style={{ marginTop: '0.5rem' }}>
            {pizza.toppings.map((topping) => (
              <Tag key={topping} type="blue" style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                {menuData.toppings[topping]?.display_name || topping}
              </Tag>
            ))}
          </div>
        ) : (
          <span style={{ marginLeft: '0.5rem', color: '#525252' }}>None selected</span>
        )}
      </div>

      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' }}>
        Total: ${price.toFixed(2)}
      </div>
    </Tile>
  );
};

export default PizzaSummary;

// Made with Bob
