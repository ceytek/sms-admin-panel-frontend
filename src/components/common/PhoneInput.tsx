import React, { useState, useEffect } from 'react';
import { Input, Form, Space } from 'antd';
import { Rule } from 'antd/es/form';

export interface PhoneInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const phoneRules: Rule[] = [
  {
    required: true,
    message: 'GSM numarası zorunludur',
  },
  {
    validator: async (_, value) => {
      if (value && value.replace(/\D/g, '').length < 10) {
        throw new Error('Telefon numarası en az 10 karakter olmalıdır');
      }
    }
  }
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name = 'phone',
  value,
  onChange,
  required = false,
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value && value.startsWith('05')) {
      setInputValue(formatPhoneNumber(value.substring(2)));
    }
  }, [value]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as XXX XXX XX XX (without the leading 05)
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return cleaned;

    const parts = [match[1], match[2], match[3], match[4]];
    let formatted = '';
    
    // Add first 3 digits
    if (parts[0]) {
      formatted += parts[0];
    }
    // Add space and next 3 digits
    if (parts[1]) {
      formatted += ' ' + parts[1];
    }
    // Add space and next 2 digits
    if (parts[2]) {
      formatted += ' ' + parts[2];
    }
    // Add space and final 2 digits
    if (parts[3]) {
      formatted += ' ' + parts[3];
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numbersOnly = newValue.replace(/\D/g, '');
    
    const formatted = formatPhoneNumber(numbersOnly);
    setInputValue(formatted);
    
    if (onChange) {
      onChange('05' + numbersOnly);
    }
  };

  const rules: Rule[] = required ? phoneRules : [];

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
      trigger="onChange"
    >
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          style={{ width: '40px', textAlign: 'center' }}
          value="05"
          disabled={true}
          className={className}
        />
        <Input
          style={{ width: 'calc(100% - 40px)' }}
          placeholder="XXX XX XX"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className={className}
          maxLength={15}
        />
      </Space.Compact>
    </Form.Item>
  );
}; 