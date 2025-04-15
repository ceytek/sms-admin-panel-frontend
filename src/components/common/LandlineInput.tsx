import React, { useState, useEffect } from 'react';
import { Input, Form, Space } from 'antd';
import { Rule } from 'antd/es/form';

export interface LandlineInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const landlineRules: Rule[] = [
  {
    required: true,
    message: 'Sabit telefon numarası zorunludur',
  },
  {
    pattern: /^0[2-4][0-9]{8}$/,
    message: 'Geçerli bir sabit telefon numarası giriniz (0[2-4]XX XXX XX XX)',
  },
];

export const LandlineInput: React.FC<LandlineInputProps> = ({
  name = 'landline',
  value,
  onChange,
  required = false,
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value && value.startsWith('0')) {
      setInputValue(formatLandlineNumber(value.substring(1)));
    }
  }, [value]);

  const formatLandlineNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as XXX XXX XX XX (without the leading 0)
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return cleaned;

    const parts = [match[1], match[2], match[3], match[4]];
    let formatted = '';
    
    // Add area code (first 3 digits)
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
    // Sadece rakamları al
    const numbersOnly = newValue.replace(/\D/g, '');
    
    // Maksimum 10 rakam (başındaki 0 hariç)
    if (numbersOnly.length <= 10) {
      const formatted = formatLandlineNumber(newValue);
      setInputValue(formatted);
      
      if (onChange) {
        // Add the "0" prefix back when sending the value up
        onChange('0' + formatted.replace(/\s/g, ''));
      }
    }
  };

  const rules: Rule[] = required ? landlineRules : [landlineRules[1]];

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
      trigger="onChange"
    >
      <Space.Compact style={{ width: '100%' }}>
        <Input 
          style={{ width: '30px', textAlign: 'center' }}
          value="0"
          disabled={true}
          className={className}
        />
        <Input
          style={{ width: 'calc(100% - 30px)' }}
          placeholder="XXX XX XX"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className={className}
          maxLength={14}
        />
      </Space.Compact>
    </Form.Item>
  );
}; 