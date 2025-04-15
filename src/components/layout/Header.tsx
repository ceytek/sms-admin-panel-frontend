import React, { useState } from 'react';
import { Layout, Input, Button, Space, Avatar, Dropdown, Menu } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  GlobalOutlined,
  MenuOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Settings',
    },
    {
      key: '3',
      label: 'Logout',
    },
  ];

  const mobileMenuItems: MenuProps['items'] = [
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: 'Search',
      onClick: () => setShowSearch(!showSearch),
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Notifications',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'language',
      icon: <GlobalOutlined />,
      label: 'Language',
    },
    ...userMenuItems as any[],
  ];

  return (
    <>
      <AntHeader
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          width: 'calc(100% - 250px)',
          right: 0,
          top: 0,
          zIndex: 2,
          boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        }}
      >
        <Space>
          <Button 
            type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="header-search">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search..."
              style={{ width: 200 }}
            />
          </div>
        </Space>

        {/* Desktop Menu */}
        <Space size="large" className="desktop-menu">
          <Button type="text" icon={<BellOutlined />} />
          <Button type="text" icon={<SettingOutlined />} />
          <Button type="text" icon={<GlobalOutlined />} />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>Admin User</span>
            </Space>
          </Dropdown>
        </Space>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <Dropdown menu={{ items: mobileMenuItems }} placement="bottomRight" trigger={['click']}>
            <Button type="text" icon={<MenuOutlined />} />
          </Dropdown>
        </div>
      </AntHeader>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="mobile-search">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: '100%' }}
          />
        </div>
      )}
    </>
  );
}; 