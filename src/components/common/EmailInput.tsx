import React from 'react';
import { Input, Form } from 'antd';
import { Rule } from 'antd/es/form';

export interface EmailInputProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Gelişmiş e-posta validasyon regex'i
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Yaygın yazım hatalarını kontrol eden fonksiyon
const checkCommonMistakes = (email: string): string | null => {
  const commonMistakes = [
    { wrong: '.con', right: '.com' },
    { wrong: 'gmial', right: 'gmail' },
    { wrong: 'hotmai', right: 'hotmail' },
    { wrong: 'yaho', right: 'yahoo' },
    { wrong: '.com.tr.', right: '.com.tr' },
  ];

  for (const mistake of commonMistakes) {
    if (email.includes(mistake.wrong)) {
      return `"${mistake.wrong}" yerine "${mistake.right}" yazmak mı istediniz?`;
    }
  }

  return null;
};

export const emailRules: Rule[] = [
  {
    required: true,
    message: 'E-posta adresi zorunludur',
  },
  {
    pattern: EMAIL_REGEX,
    message: 'Geçerli bir e-posta adresi giriniz',
  },
  {
    validator: async (_: any, value: string) => {
      if (value) {
        // Yaygın yazım hatalarını kontrol et
        const mistakeMessage = checkCommonMistakes(value.toLowerCase());
        if (mistakeMessage) {
          throw new Error(mistakeMessage);
        }

        // Minimum uzunluk kontrolü
        if (value.length < 5) {
          throw new Error('E-posta adresi çok kısa');
        }

        // Boşluk kontrolü
        if (value.includes(' ')) {
          throw new Error('E-posta adresinde boşluk olamaz');
        }

        // Ardışık nokta kontrolü
        if (value.includes('..')) {
          throw new Error('E-posta adresinde ardışık nokta olamaz');
        }
      }
    },
  }
];

export const EmailInput: React.FC<EmailInputProps> = ({
  name = 'email',
  value,
  onChange,
  required = false,
  disabled = false,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const rules: Rule[] = required ? emailRules : emailRules.slice(1);

  return (
    <Form.Item
      name={name}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Input
        placeholder="E-posta adresi"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={className}
        type="email"
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
}; 