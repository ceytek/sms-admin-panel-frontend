import React, { useState, useEffect } from 'react';
import { Layout, Button, Menu } from 'antd';
import { 
  MenuOutlined, 
  DashboardOutlined,
  UserOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import './MainLayout.css';

const { Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
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
          borderRight: '1px solid #EDEAE9',
        }}
      >
        <div style={{
          height: '50px',
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
          defaultSelectedKeys={['1']}
          style={{ backgroundColor: '#F6F8F9', borderRight: 'none' }}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Users',
              onClick: () => navigate('/users'),
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'Settings',
              onClick: () => navigate('/settings'),
            },
          ]}
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