import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../types/auth.types';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginCredentials) => {
    const success = await login(values);
    if (success) {
      navigate('/dashboard'); // Başarılı girişte dashboard'a yönlendir
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Giriş Yap</h1>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Kullanıcı Adı"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi giriniz' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifre"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}; 