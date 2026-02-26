import React from 'react';
import { TextInput, TextArea, Form } from '@carbon/react';

interface CustomerInfoProps {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onAddressChange: (address: string) => void;
  errors?: {
    name?: string;
    phone?: string;
    address?: string;
  };
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerName,
  customerPhone,
  customerAddress,
  onNameChange,
  onPhoneChange,
  onAddressChange,
  errors = {},
}) => {
  return (
    <Form>
      <TextInput
        id="customer-name"
        labelText="Full Name"
        placeholder="Enter your full name"
        value={customerName}
        onChange={(e) => onNameChange(e.target.value)}
        invalid={!!errors.name}
        invalidText={errors.name}
        required
      />

      <TextInput
        id="customer-phone"
        labelText="Phone Number"
        placeholder="555-123-4567"
        value={customerPhone}
        onChange={(e) => onPhoneChange(e.target.value)}
        invalid={!!errors.phone}
        invalidText={errors.phone}
        helperText="10-digit phone number"
        required
      />

      <TextArea
        id="customer-address"
        labelText="Delivery Address"
        placeholder="Enter your delivery address"
        value={customerAddress}
        onChange={(e) => onAddressChange(e.target.value)}
        invalid={!!errors.address}
        invalidText={errors.address}
        rows={3}
        required
      />
    </Form>
  );
};

export default CustomerInfo;

// Made with Bob
