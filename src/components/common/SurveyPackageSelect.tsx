import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

interface SurveyPackageSelectProps {
  name: string;
  required?: boolean;
}

export const SurveyPackageSelect: React.FC<SurveyPackageSelectProps> = ({
  name,
  required = false,
}) => {
  return (
    <Form.Item
      name={name}
      label="Anket Paketi"
      required={required}
      rules={[
        {
          required: required,
          message: 'Lütfen bir paket seçiniz',
        },
      ]}
    >
      <Select placeholder="Bir paket seçiniz">
        <Option value="30">Yıllık 30 Anket</Option>
        <Option value="10">Yıllık 10 Anket</Option>
      </Select>
    </Form.Item>
  );
}; 