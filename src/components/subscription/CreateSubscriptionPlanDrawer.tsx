import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Input, Select, message, InputNumber } from 'antd';
import { subscriptionService } from '../../services/subscription.service';

interface CreateSubscriptionPlanDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateSubscriptionPlanDrawer: React.FC<CreateSubscriptionPlanDrawerProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (price?: number, taxRate?: number) => {
    if (price && taxRate) {
      const taxAmount = price * (taxRate / 100);
      return price + taxAmount;
    }
    return 0;
  };

  const handlePriceOrTaxChange = () => {
    const price = form.getFieldValue('price');
    const taxRate = form.getFieldValue('tax_rate');
    setTotalPrice(calculateTotalPrice(price, taxRate));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const response = await subscriptionService.createPlan({
        name: values.name,
        service_count: values.service_count,
        price: values.price * 100, // Convert to cents
        tax_rate: values.tax_rate,
        payment_period: values.payment_period,
      });

      if (response.error) {
        message.error(response.error);
      } else {
        message.success('Servis planı başarıyla oluşturuldu');
        form.resetFields();
        onSuccess();
        onClose();
      }
    } catch (error) {
      message.error('Lütfen tüm alanları doğru şekilde doldurunuz');
    }
  };

  return (
    <Drawer
      title="Yeni Servis Planı Oluştur"
      width={520}
      onClose={onClose}
      open={open}
      extra={
        <Button type="primary" onClick={handleSubmit}>
          Kaydet
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Servis Adı"
          rules={[{ required: true, message: 'Lütfen servis adını giriniz' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="service_count"
          label="Servis Sayısı"
          rules={[{ required: true, message: 'Lütfen servis sayısını giriniz' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Fiyat (KDV Hariç)"
          rules={[{ required: true, message: 'Lütfen fiyat giriniz' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            style={{ width: '100%' }}
            prefix="₺"
            onChange={handlePriceOrTaxChange}
          />
        </Form.Item>

        <Form.Item
          name="tax_rate"
          label="KDV Oranı (%)"
          rules={[{ required: true, message: 'Lütfen KDV oranını giriniz' }]}
          initialValue={20}
        >
          <InputNumber
            min={0}
            max={100}
            step={1}
            style={{ width: '100%' }}
            onChange={handlePriceOrTaxChange}
          />
        </Form.Item>

        <Form.Item
          label="Toplam Tutar (KDV Dahil)"
        >
          <InputNumber
            value={totalPrice}
            disabled
            style={{ width: '100%' }}
            prefix="₺"
            precision={2}
          />
        </Form.Item>

        <Form.Item
          name="payment_period"
          label="Ödeme Periyodu"
          rules={[{ required: true, message: 'Lütfen ödeme periyodunu seçiniz' }]}
        >
          <Select>
            <Select.Option value="MONTHLY">Aylık</Select.Option>
            <Select.Option value="ANNUAL">Yıllık</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
}; 