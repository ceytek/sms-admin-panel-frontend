import React from 'react';
import { Drawer, Form, Input, Row, Col, Select, DatePicker, Button, Space } from 'antd';

interface CreateUserDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserDrawer: React.FC<CreateUserDrawerProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // TODO: Implement user creation logic
      onClose();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Drawer
      title="Yeni Kullanıcı Oluştur"
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>İptal</Button>
          <Button onClick={onSubmit} type="primary">
            Oluştur
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Kullanıcı Adı"
              rules={[{ required: true, message: 'Lütfen kullanıcı adı girin' }]}
            >
              <Input placeholder="Kullanıcı adı girin" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: 'Lütfen e-posta girin' },
                { type: 'email', message: 'Geçerli bir e-posta girin' }
              ]}
            >
              <Input placeholder="E-posta girin" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Rol"
              rules={[{ required: true, message: 'Lütfen bir rol seçin' }]}
            >
              <Select placeholder="Rol seçin">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">Kullanıcı</Select.Option>
                <Select.Option value="editor">Editör</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Durum"
              rules={[{ required: true, message: 'Lütfen durum seçin' }]}
            >
              <Select placeholder="Durum seçin">
                <Select.Option value="active">Aktif</Select.Option>
                <Select.Option value="inactive">Pasif</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="notes"
              label="Notlar"
            >
              <Input.TextArea rows={4} placeholder="Kullanıcı hakkında notlar" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}; 