import React from 'react';
import { RadioButtonGroup, RadioButton, FormGroup } from '@carbon/react';
import { PizzaSize, SizeItem } from '../../types';

interface SizeSelectorProps {
  selectedSize: PizzaSize;
  sizes: Record<string, SizeItem>;
  onChange: (size: PizzaSize) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes, onChange }) => {
  return (
    <FormGroup legendText="Select Pizza Size">
      <RadioButtonGroup
        name="pizza-size"
        valueSelected={selectedSize}
        onChange={(value) => onChange(value as PizzaSize)}
        orientation="vertical"
      >
        {Object.entries(sizes).map(([key, size]) => (
          <RadioButton
            key={key}
            labelText={`${size.display_name} - $${size.base_price.toFixed(2)}`}
            value={key}
            id={`size-${key}`}
          />
        ))}
      </RadioButtonGroup>
    </FormGroup>
  );
};

export default SizeSelector;

// Made with Bob
