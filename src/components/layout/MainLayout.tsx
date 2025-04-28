import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu } from 'antd';
import { 
  MenuOutlined, 
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  PlusOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { CreateUserDrawer } from '../users/CreateUserDrawer';
import './MainLayout.css';

const { Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        style={{
          backgroundColor: '#F6F8F9',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          height: '63px',
          borderBottom: '1px solid #EDEAE9',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          backgroundColor: '#F6F8F9',
        }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleSidebar}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B6C6F',
              border: 'none',
              padding: 0,
            }}
          />
          {!collapsed && (
            <span style={{ 
              marginLeft: '8px', 
              fontSize: '16px',
              fontWeight: 500,
              color: '#1E1F21'
            }}>
              Admin Panel
            </span>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ backgroundColor: '#F6F8F9', borderRight: 'none', flex: 1 }}
          items={[
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
              key: 'service-management',
              icon: <ToolOutlined />,
              label: 'Servis Yönetimi',
              onClick: () => navigate('/service-management'),
            },
            {
              key: 'allusers',
              icon: <UserOutlined />,
              label: 'Kullanıcı İşlemleri',
              onClick: () => navigate('/allusers'),
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: 'Settings',
              onClick: () => navigate('/settings'),
            },
          ]}
        />
        <div style={{
          padding: '16px',
          borderTop: '1px solid #EDEAE9',
          backgroundColor: '#F6F8F9',
          marginTop: 'auto'
        }}>
          <Button
            type="dashed"
            icon={<PlusOutlined style={{ color: '#6B6C6F' }} />}
            onClick={() => setDrawerVisible(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              height: '40px',
              color: '#6B6C6F',
              borderColor: '#D9D9D9',
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }}
          >
            {!collapsed && 'Create Project'}
          </Button>
        </div>

        <CreateUserDrawer
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s' }}>
        <Header collapsed={collapsed} />
        <Content className="site-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}; 