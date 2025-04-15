import React, { useState, useEffect } from 'react';
import { Form, Select, Space } from 'antd';
import { cities } from '../../data/cities';

interface CityDistrictSelectProps {
  cityName?: string;
  districtName?: string;
  required?: boolean;
  disabled?: boolean;
}

const CityDistrictSelect: React.FC<CityDistrictSelectProps> = ({
  cityName = 'city',
  districtName = 'district',
  required = false,
  disabled = false,
}) => {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [districts, setDistricts] = useState<{ id: number; name: string; }[]>([]);
  const form = Form.useFormInstance();

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find(c => c.name === selectedCity);
      if (city) {
        setDistricts(city.districts);
      } else {
        setDistricts([]);
      }
      // İl değiştiğinde ilçeyi sıfırla
      form.setFieldValue(districtName, undefined);
    } else {
      setDistricts([]);
      form.setFieldValue(districtName, undefined);
    }
  }, [selectedCity, districtName, form]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form.Item
        name={cityName}
        label="İl"
        rules={[{ required: required, message: 'Lütfen il seçiniz' }]}
      >
        <Select
          placeholder="İl seçiniz"
          onChange={(value) => setSelectedCity(value)}
          disabled={disabled}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
          options={cities.map(city => ({
            value: city.name,
            label: city.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        name={districtName}
        label="İlçe"
        rules={[{ required: required, message: 'Lütfen ilçe seçiniz' }]}
      >
        <Select
          placeholder="İlçe seçiniz"
          disabled={!selectedCity || disabled}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
          options={districts.map(district => ({
            value: district.name,
            label: district.name,
          }))}
        />
      </Form.Item>
    </Space>
  );
};

export default CityDistrictSelect; 