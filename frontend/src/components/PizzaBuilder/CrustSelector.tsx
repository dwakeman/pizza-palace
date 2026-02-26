import React from 'react';
import { Select, SelectItem, FormGroup } from '@carbon/react';
import { CrustItem } from '../../types';

interface CrustSelectorProps {
  selectedCrust: string;
  crusts: Record<string, CrustItem>;
  onChange: (crust: string) => void;
}

const CrustSelector: React.FC<CrustSelectorProps> = ({ selectedCrust, crusts, onChange }) => {
  return (
    <FormGroup legendText="Select Crust Type">
      <Select
        id="crust-select"
        labelText=""
        value={selectedCrust}
        onChange={(e) => onChange(e.target.value)}
      >
        <SelectItem value="" text="Choose a crust type" />
        {Object.entries(crusts).map(([key, crust]) => (
          <SelectItem
            key={key}
            value={key}
            text={`${crust.display_name} ${crust.price_modifier > 0 ? `(+$${crust.price_modifier.toFixed(2)})` : ''}`}
          />
        ))}
      </Select>
    </FormGroup>
  );
};

export default CrustSelector;

// Made with Bob
