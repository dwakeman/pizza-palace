import React from 'react';
import { Checkbox, FormGroup, Grid, Column } from '@carbon/react';
import { ToppingItem } from '../../types';

interface ToppingSelectorProps {
  selectedToppings: string[];
  toppings: Record<string, ToppingItem>;
  onChange: (toppings: string[]) => void;
}

const ToppingSelector: React.FC<ToppingSelectorProps> = ({
  selectedToppings,
  toppings,
  onChange,
}) => {
  const handleToppingChange = (toppingKey: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedToppings, toppingKey]);
    } else {
      onChange(selectedToppings.filter((t) => t !== toppingKey));
    }
  };

  return (
    <FormGroup legendText="Select Toppings ($1.50 each)">
      <Grid narrow>
        {Object.entries(toppings).map(([key, topping]) => (
          <Column key={key} lg={4} md={4} sm={4}>
            <Checkbox
              id={`topping-${key}`}
              labelText={topping.display_name}
              checked={selectedToppings.includes(key)}
              onChange={(e) => handleToppingChange(key, e.target.checked)}
            />
          </Column>
        ))}
      </Grid>
    </FormGroup>
  );
};

export default ToppingSelector;

// Made with Bob
