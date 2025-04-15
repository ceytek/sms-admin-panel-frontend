import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
          zIndex: 1000,
        }}
      >
        <div style={{
          height: '50px',
          borderBottom: '1px solid #EDEAE9',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
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
        <Sidebar />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s' }}>
        <Content style={{
          margin: '24px',
          padding: '24px',
          minHeight: 280,
          backgroundColor: '#fff',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 