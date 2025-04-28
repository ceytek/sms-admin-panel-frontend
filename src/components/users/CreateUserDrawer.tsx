import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Card, Input, message, Select } from 'antd';
import { UsernameInput } from '../common/UsernameInput';
import { PasswordInput } from '../common/PasswordInput';
import { PhoneInput } from '../common/PhoneInput';
import { EmailInput } from '../common/EmailInput';
import companyService from '../../services/company.service';
import { subscriptionService } from '../../services/subscription.service';
import locationData from '../../data/turkey-locations.json';

interface CreateUserDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateUserDrawer: React.FC<CreateUserDrawerProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState<string[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await subscriptionService.getPlans();
      if (response.error) {
        message.error(response.error);
      } else {
        setSubscriptionPlans(response.plans);
      }
    } catch (error) {
      message.error('Abonelik planları yüklenirken bir hata oluştu');
    }
  };

  const handleProvinceChange = (value: string) => {
    const selectedProvince = locationData.provinces.find(p => p.name === value);
    setDistricts(selectedProvince?.districts || []);
    form.setFieldValue('district', undefined);
  };

  const resetForm = () => {
    form.resetFields();
    setDistricts([]);
    setTimeout(() => {
      form.validateFields(['username']);
    }, 0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const response = await companyService.register({
        username: values.username,
        password: values.password,
        companyName: values.companyName,
        companyEmail: values.companyEmail,
        companyPhone: values.companyPhone,
        companyAddress: values.companyAddress,
        companyAuthorizedPerson: values.companyAuthorizedPerson,
        province: values.province,
        district: values.district,
        plan_id: values.plan_id,
        role_id: "25c46362-d3df-4199-b87f-69b42eb01302"
      });

      if (response.success) {
        message.success(response.message || 'Kayıt başarıyla oluşturuldu');
        resetForm();
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        message.error(response.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Form validation failed:', error);
      message.error('Lütfen tüm alanları doğru şekilde doldurunuz');
    }
  };

  return (
    <Drawer
      title="Yeni Kayıt Oluştur"
      width={720}
      onClose={handleClose}
      open={open}
      extra={
        <Button type="primary" onClick={handleSubmit}>
          Kaydet
        </Button>
      }
      afterOpenChange={(visible) => {
        if (!visible) {
          resetForm();
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Card title="Kullanıcı İşlemleri" style={{ marginBottom: 16 }}>
          <UsernameInput 
            name="username"
            required={true}
            form={form}
          />
          <PasswordInput 
            name="password"
            required={true}
          />
        </Card>

        <Card title="Firma Bilgileri" style={{ marginBottom: 16 }}>
          <Form.Item
            name="companyName"
            label="Firma Adı"
            required={true}
            rules={[{ required: true, message: 'Lütfen firma adını giriniz' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="companyAddress"
            label="Firma Adresi"
            required={true}
            rules={[
              { required: true, message: 'Lütfen firma adresini giriniz' },
              { min: 5, message: 'Adres en az 5 karakter olmalıdır' }
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="province"
            label="İl"
            required={true}
            rules={[{ required: true, message: 'Lütfen il seçiniz' }]}
          >
            <Select
              placeholder="İl seçiniz"
              onChange={handleProvinceChange}
              options={locationData.provinces.map(p => ({ label: p.name, value: p.name }))}
            />
          </Form.Item>

          <Form.Item
            name="district"
            label="İlçe"
            required={true}
            rules={[{ required: true, message: 'Lütfen ilçe seçiniz' }]}
          >
            <Select
              placeholder="İlçe seçiniz"
              options={districts.map(d => ({ label: d, value: d }))}
            />
          </Form.Item>

          <PhoneInput
            name="companyPhone"
            required={true}
          />

          <Form.Item
            name="companyAuthorizedPerson"
            label="Firma Yetkili Adı"
            required={true}
            rules={[
              { required: true, message: 'Lütfen yetkili adını giriniz' },
              { min: 3, message: 'Yetkili adı en az 3 karakter olmalıdır' }
            ]}
          >
            <Input />
          </Form.Item>

          <EmailInput
            name="companyEmail"
            required={true}
          />
        </Card>

        <Card title="Paket Bilgisi">
          <Form.Item
            name="plan_id"
            label="Abonelik Paketi"
            rules={[{ required: true, message: 'Lütfen abonelik paketi seçiniz' }]}
          >
            <Select
              placeholder="Paket seçiniz"
              loading={loading}
              options={subscriptionPlans.map(plan => ({
                label: plan.name,
                value: plan.id
              }))}
            />
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  );
}; 