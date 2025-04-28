import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { subscriptionService } from '../services/subscription.service';
import { SubscriptionPlan } from '../types/auth.types';
import { CreateSubscriptionPlanDrawer } from '../components/subscription/CreateSubscriptionPlanDrawer';
import dayjs from 'dayjs';

export const ServiceManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await subscriptionService.getPlans();
      if (response.error) {
        message.error(response.error);
      } else {
        console.log('Subscription Plans:', response.plans);
        setPlans(response.plans);
      }
    } catch (error) {
      console.error('Servis planları yüklenirken bir hata oluştu:', error);
      message.error('Servis planları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Servis Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Servis Sayısı',
      dataIndex: 'service_count',
      key: 'service_count',
      render: (count: number) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: 'Fiyat (KDV Hariç)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `₺${(price / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
    },
    {
      title: 'KDV Oranı',
      dataIndex: 'tax_rate',
      key: 'tax_rate',
      render: (rate: number) => rate ? `%${rate}` : '-',
    },
    {
      title: 'Toplam Tutar',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (total: number, record: any) => {
        if (!record.price || !record.tax_rate) return '-';
        const calculatedTotal = record.price * (1 + record.tax_rate / 100);
        return `₺${(calculatedTotal / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
      },
    },
    {
      title: 'Ödeme Periyodu',
      dataIndex: 'payment_period',
      key: 'payment_period',
      render: (period: string) => {
        const periodMap: { [key: string]: string } = {
          MONTHLY: 'Aylık',
          ANNUAL: 'Yıllık',
        };
        return periodMap[period] || period;
      },
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
  ];

  return (
    <Card 
      title="Servis Yönetimi" 
      style={{ margin: '24px' }}
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Yeni Servis Ekle
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={plans}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Toplam ${total} kayıt`
        }}
      />
      <CreateSubscriptionPlanDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={fetchPlans}
      />
    </Card>
  );
}; 