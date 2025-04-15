import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { MainLayout } from '../components/layout/MainLayout';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
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
        <Col xs={24} sm={12} lg={6}>
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
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="dashboard-card">
            <Statistic
              title="COMPANY VALUE"
              value={1.45}
              precision={2}
              suffix="M"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="dashboard-card">
            <Statistic
              title="NEW EMPLOYEES"
              value={34}
              prefix={<ArrowUpOutlined />}
              suffix=" hires"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Dashboard; 