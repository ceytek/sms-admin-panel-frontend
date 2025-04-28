import React, { useEffect } from 'react';
import { Form, Input, FormInstance } from 'antd';

interface UsernameInputProps {
  name: string;
  required?: boolean;
  form: FormInstance;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({
  name,
  required = false,
  form
}) => {
  const generateRandomUsername = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const setRandomUsername = () => {
    form.setFieldValue(name, generateRandomUsername());
  };

  useEffect(() => {
    // Form açıldığında otomatik olarak rastgele kullanıcı adı oluştur
    setRandomUsername();
  }, [form, name]);

  // Form değeri undefined veya boş olduğunda yeni kullanıcı adı oluştur
  useEffect(() => {
    const username = form.getFieldValue(name);
    if (!username) {
      setRandomUsername();
    }
  }, [form.getFieldValue(name)]);

  return (
    <Form.Item
      name={name}
      label="Kullanıcı Adı"
      required={required}
      rules={[
        {
          required: required,
          message: 'Lütfen kullanıcı adı giriniz',
        },
      ]}
    >
      <Input readOnly />
    </Form.Item>
  );
}; 