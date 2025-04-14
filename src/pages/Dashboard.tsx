import React from 'react';
import { Layout, Menu, Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <h1 style={{ color: 'white', margin: 0 }}>Admin Panel</h1>
      </Header>
      <Layout hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            theme="dark"
            style={{ height: '100%' }}
            items={[
              {
                key: '1',
                icon: <BarChartOutlined />,
                label: 'Dashboard',
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'Kullanıcılar',
              },
              {
                key: '3',
                icon: <ShoppingCartOutlined />,
                label: 'Ürünler',
              },
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px', minHeight: '100%', background: '#f0f2f5' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card>
                <Statistic
                  title="Toplam Kullanıcı"
                  value={1128}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card>
                <Statistic
                  title="Toplam Satış"
                  value={93}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card>
                <Statistic
                  title="Toplam Gelir"
                  value={11280}
                  prefix={<DollarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card>
                <Statistic
                  title="Aktif Kullanıcılar"
                  value={98}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard; 