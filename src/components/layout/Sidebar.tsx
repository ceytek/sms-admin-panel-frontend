import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  UserOutlined,
  AppstoreOutlined,
  FileOutlined,
  PlusOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './layout.css';
import { CreateUserDrawer } from '../users/CreateUserDrawer';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users'),
    },
    {
      key: 'kullanici-islemleri',
      icon: <UserOutlined />,
      label: 'Kullanıcı İşlemleri',
      onClick: () => navigate('/allusers'),
    },
    {
      key: 'servis-yonetimi',
      icon: <ToolOutlined />,
      label: 'Servis Yönetimi',
      onClick: () => navigate('/service-management'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    }
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
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
        defaultSelectedKeys={['dashboard']}
        style={{ 
          flex: 1,
          borderRight: 0,
          height: 'calc(100vh - 120px)',
          overflowY: 'auto'
        }}
        items={menuItems}
      />
      <div className="sidebar-footer" style={{ padding: '16px' }}>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
          style={{
            width: '90%',
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderRadius: '6px',
            padding: '4px 15px',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: '0 auto'
          }}
        >
          Create project
        </Button>
      </div>
      <CreateUserDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Sider>
  );
}; 