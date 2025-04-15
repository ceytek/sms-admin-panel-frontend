import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Kullanıcılar',
    },
    {
      key: '/customers',
      icon: <TeamOutlined />,
      label: 'Müşteriler',
    },
    {
      key: '/products',
      icon: <ShopOutlined />,
      label: 'Ürünler',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Ayarlar',
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
      style={{ 
        height: 'calc(100vh - 50px)',
        borderRight: 'none',
        backgroundColor: '#F6F8F9',
        paddingTop: '8px',
      }}
    />
  );
};

export default Sidebar; 