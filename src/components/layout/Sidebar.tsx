import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  UserOutlined,
  AppstoreOutlined,
  FileOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './layout.css';
import { CreateUserDrawer } from '../users/CreateUserDrawer';

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    {
      key: 'dashboards',
      icon: <DashboardOutlined />,
      label: 'Dashboards',
      children: [
        {
          key: 'analytics',
          icon: <BarChartOutlined />,
          label: 'Analytics'
        },
        {
          key: 'commerce',
          icon: <ShoppingOutlined />,
          label: 'Commerce'
        },
        {
          key: 'sales',
          icon: <BarChartOutlined />,
          label: 'Sales'
        },
        {
          key: 'minimal',
          icon: <DashboardOutlined />,
          label: 'Minimal'
        }
      ]
    },
    {
      key: 'crm',
      icon: <UserOutlined />,
      label: 'CRM'
    },
    {
      key: 'pages',
      icon: <FileOutlined />,
      label: 'Pages'
    },
    {
      key: 'applications',
      icon: <AppstoreOutlined />,
      label: 'Applications'
    }
  ];

  return (
    <Sider
      width={250}
      style={{
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ height: '64px', padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Architect</h1>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['minimal']}
        defaultOpenKeys={['dashboards']}
        style={{ 
          flex: 1,
          borderRight: 0 
        }}
        items={menuItems}
      />
      <div className="sidebar-footer">
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="create-button"
          onClick={() => setDrawerOpen(true)}
        >
          Oluştur
        </Button>
      </div>
      <CreateUserDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Sider>
  );
}; 