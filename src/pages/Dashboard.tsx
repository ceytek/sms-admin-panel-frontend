import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { MainLayout } from '../components/layout/MainLayout';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div style={{ padding: '24px 0' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card bordered={false} className="dashboard-card">
              <Statistic
                title="NEW ACCOUNTS"
                value={234}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card bordered={false} className="dashboard-card">
              <Statistic
                title="TOTAL EXPENSES"
                value={71}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card bordered={false} className="dashboard-card">
              <Statistic
                title="COMPANY VALUE"
                value={1.45}
                precision={2}
                suffix="M"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Card bordered={false} className="dashboard-card">
              <Statistic
                title="NEW EMPLOYEES"
                value={34}
                suffix="hires"
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Dashboard; 