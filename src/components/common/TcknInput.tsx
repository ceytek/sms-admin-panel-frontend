import React from 'react';
import { Input, Form } from 'antd';
import { Rule } from 'antd/es/form';

export interface TcknInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// TC Kimlik Numarası doğrulama fonksiyonu
const validateTckn = (value: string): boolean => {
  if (!value) return false;
  
  // 11 haneli olmalı ve 0 ile başlamamalı
  if (value.length !== 11 || value[0] === '0') return false;

  const digits = value.split('').map(Number);
  
  // Son rakam çift olmalı
  if (digits[10] % 2 !== 0) return false;

  // 1, 3, 5, 7, 9. rakamların toplamı
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  
  // 2, 4, 6, 8. rakamların toplamı
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

  // 10. rakam kontrolü
  const digit10 = ((oddSum * 7) - evenSum) % 10;
  if (digits[9] !== digit10) return false;

  // İlk 10 rakamın toplamının birler basamağı 11. rakam olmalı
  const sum = digits.slice(0, 10).reduce((acc, curr) => acc + curr, 0);
  if (digits[10] !== sum % 10) return false;

  return true;
};

export const tcknRules: Rule[] = [
  {
    required: true,
    message: 'TC Kimlik Numarası zorunludur',
  },
  {
    pattern: /^[1-9]\d{10}$/,
    message: 'TC Kimlik Numarası 11 haneli sayısal bir değer olmalı ve 0 ile başlamamalıdır',
  },
  {
    validator: async (_: any, value: string) => {
      if (value && !validateTckn(value)) {
        throw new Error('Geçersiz TC Kimlik Numarası');
      }
    },
  }
];

export const TcknInput: React.FC<TcknInputProps> = ({
  name = 'tckn',
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
    
    // Maksimum 11 rakam
    if (numbersOnly.length <= 11) {
      if (onChange) {
        onChange(numbersOnly);
      }
    }
  };

  const rules: Rule[] = required ? tcknRules : tcknRules.slice(1);

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Input
        placeholder="TC Kimlik No (11 haneli)"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
        maxLength={11}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
}; 