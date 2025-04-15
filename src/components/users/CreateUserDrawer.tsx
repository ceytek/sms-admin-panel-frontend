import React from 'react';
import { Drawer, Form, Button, Space } from 'antd';
import { PhoneInput } from '../common/PhoneInput';
import { LandlineInput } from '../common/LandlineInput';
import { TaxNumberInput } from '../common/TaxNumberInput';
import { TcknInput } from '../common/TcknInput';
import { EmailInput } from '../common/EmailInput';
import CityDistrictSelect from '../common/CityDistrictSelect';
import MersisInput from '../common/MersisInput';

interface CreateUserDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserDrawer: React.FC<CreateUserDrawerProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Drawer
      title="Yeni Kayıt Oluştur"
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
        <TcknInput
          name="tckn"
          required={true}
        />
        <EmailInput
          name="email"
          required={true}
        />
        <MersisInput
          name="mersisNo"
          required={true}
        />
        <CityDistrictSelect
          required={true}
        />
        <TaxNumberInput
          name="taxNumber"
          required={true}
        />
        <PhoneInput
          name="mobilePhone"
          required={true}
        />
        <LandlineInput
          name="landlinePhone"
          required={true}
        />
      </Form>
    </Drawer>
  );
}; 