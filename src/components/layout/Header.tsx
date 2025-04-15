import React, { useState } from 'react';
import { Layout, Input, Button, Space, Avatar, Dropdown } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  GlobalOutlined,
  MenuOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Header.css';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
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
    <AntHeader
      className="site-header"
      style={{
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'fixed',
        width: `calc(100% - ${collapsed ? 80 : 280}px)`,
        right: 0,
        top: 0,
        zIndex: 2,
        boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        transition: 'all 0.2s',
      }}
    >
      {/* Desktop Components */}
      <Space size="middle" className="desktop-components">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          style={{ width: 200 }}
        />
        <Button type="text" icon={<BellOutlined />} />
        <Button type="text" icon={<SettingOutlined />} />
        <Button type="text" icon={<GlobalOutlined />} />
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <span className="user-name">Admin User</span>
          </Space>
        </Dropdown>
      </Space>

      {/* Mobile Components */}
      <Space size="small" className="mobile-components">
        <Dropdown menu={{ items: mobileMenuItems }} placement="bottomRight" trigger={['click']}>
          <Button type="text" icon={<MenuOutlined />} />
        </Dropdown>
        <Avatar icon={<UserOutlined />} />
      </Space>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div 
          className="mobile-search"
          style={{
            position: 'fixed',
            top: '64px',
            left: collapsed ? 80 : 280,
            right: 0,
            padding: '12px',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
            zIndex: 2,
            transition: 'all 0.2s',
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: '100%' }}
            autoFocus
          />
        </div>
      )}
    </AntHeader>
  );
}; 