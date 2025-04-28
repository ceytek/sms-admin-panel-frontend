import React from 'react';
import { Form, Input } from 'antd';

interface PasswordInputProps {
  name: string;
  required?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  required = false,
}) => {
  return (
    <Form.Item
      name={name}
      label="Şifre"
      required={required}
      rules={[
        {
          required: required,
          message: 'Lütfen şifre giriniz',
        },
        {
          min: 8,
          message: 'Şifre en az 8 karakter olmalıdır',
        },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Şifre en az bir büyük harf, bir küçük harf ve bir özel karakter içermelidir',
        },
      ]}
    >
      <Input.Password placeholder="Örnek: Cey@tek85" />
    </Form.Item>
  );
}; 