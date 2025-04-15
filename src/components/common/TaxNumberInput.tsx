import React from 'react';
import { Input, Form } from 'antd';
import { Rule } from 'antd/es/form';

export interface TaxNumberInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const taxNumberRules: Rule[] = [
  {
    required: true,
    message: 'Vergi numarası zorunludur',
  },
  {
    pattern: /^\d{10}$/,
    message: 'Vergi numarası 10 haneli sayısal bir değer olmalıdır',
  },
];

export const TaxNumberInput: React.FC<TaxNumberInputProps> = ({
  name = 'taxNumber',
  value,
  onChange,
  required = false,
  disabled = false,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Sadece rakamları al
    const numbersOnly = newValue.replace(/\D/g, '');
    
    // Maksimum 10 rakam
    if (numbersOnly.length <= 10) {
      if (onChange) {
        onChange(numbersOnly);
      }
    }
  };

  const rules: Rule[] = required ? taxNumberRules : [taxNumberRules[1]];

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Input
        placeholder="Vergi numarası (10 haneli)"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
        maxLength={10}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
}; 