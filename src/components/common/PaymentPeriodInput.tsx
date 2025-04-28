import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

interface PaymentPeriodInputProps {
  name: string;
  required?: boolean;
}

export const PaymentPeriodInput: React.FC<PaymentPeriodInputProps> = ({
  name,
  required = false,
}) => {
  // Ödeme dönemleri
  const paymentPeriods = [
    { id: "1", label: "1 Aylık" },
    { id: "3", label: "3 Aylık" },
    { id: "6", label: "6 Aylık" },
    { id: "12", label: "12 Aylık" }
  ];

  return (
    <Form.Item
      name={name}
      label="Ödeme Dönemi"
      required={required}
      rules={[
        {
          required: required,
          message: 'Lütfen ödeme dönemini seçiniz',
        },
      ]}
    >
      <Select
        style={{ width: '100%' }}
        placeholder="Ödeme dönemi seçiniz"
      >
        {paymentPeriods.map(period => (
          <Option key={period.id} value={period.id}>
            {period.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}; 