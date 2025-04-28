import React, { useEffect, useState } from 'react';
import { Card, Table, message, Switch, Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { usersService } from '../services/users.service';
import { CreateUserDrawer } from '../components/users/CreateUserDrawer';
import dayjs from 'dayjs';

interface User {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
  company?: {
    id: string;
    company_name: string;
    company_email: string;
    company_phone: string;
    company_address: string;
    authorized_person: string;
    subscription?: {
      id: string;
      status: string;
      start_date: string;
      end_date: string;
      subscription_plan: {
        id: string;
        name: string;
        service_count: number;
      };
    };
  };
}

export const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersService.getUsers();
      if (response.error) {
        message.error(response.error);
      } else if (response.users) {
        setUsers(response.users);
      }
    } catch (error) {
      message.error('Kullanıcılar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    fetchUsers(); // Drawer kapandığında listeyi yenile
  };

  const handleStatusChange = async (companyId: string, currentStatus: string) => {
    try {
      setUpdatingStatus(companyId);
      const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      const response = await usersService.updateSubscriptionStatus(companyId, newStatus);

      if (response.error) {
        message.error(response.error);
        return;
      }

      if (response.success && response.subscription) {
        // Kullanıcı listesini güncelle
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.company?.id === companyId && user.company.subscription) {
            return {
              ...user,
              company: {
                ...user.company,
                subscription: response.subscription
              }
            };
          }
          return user;
        }));
        message.success(`Abonelik durumu ${newStatus === 'ACTIVE' ? 'aktif' : 'pasif'} olarak güncellendi`);
      }
    } catch (error) {
      message.error('Abonelik durumu güncellenirken bir hata oluştu');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const columns = [
    {
      title: 'Kullanıcı Adı',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Firma Adı',
      dataIndex: ['company', 'company_name'],
      key: 'companyName',
    },
    {
      title: 'E-posta',
      dataIndex: ['company', 'company_email'],
      key: 'email',
    },
    {
      title: 'Telefon',
      dataIndex: ['company', 'company_phone'],
      key: 'phone',
    },
    {
      title: 'Yetkili Kişi',
      dataIndex: ['company', 'authorized_person'],
      key: 'authorizedPerson',
    },
    {
      title: 'Abonelik Durumu',
      dataIndex: ['company', 'subscription', 'status'],
      key: 'subscriptionStatus',
      render: (status: string, record: User) => (
        <Popconfirm
          title="Abonelik Durumu"
          description={`Abonelik durumunu ${status === 'ACTIVE' ? 'pasif' : 'aktif'} yapmak istediğinize emin misiniz?`}
          onConfirm={() => handleStatusChange(record.company?.id || '', status)}
          okText="Evet"
          cancelText="Hayır"
        >
          <Switch
            checked={status === 'ACTIVE'}
            loading={updatingStatus === record.company?.id}
            checkedChildren="Aktif"
            unCheckedChildren="Pasif"
          />
        </Popconfirm>
      ),
    },
    {
      title: 'Abonelik Planı',
      dataIndex: ['company', 'subscription', 'subscription_plan', 'name'],
      key: 'subscriptionPlan',
    },
    {
      title: 'Anket Sayısı',
      dataIndex: ['company', 'subscription', 'subscription_plan', 'service_count'],
      key: 'serviceCount',
    },
    {
      title: 'Kayıt Tarihi',
      dataIndex: 'created_at',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    }
  ];

  return (
    <Card 
      title="Kullanıcı İşlemleri" 
      style={{ margin: '24px' }}
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Yeni Kayıt
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Toplam ${total} kayıt`
        }}
      />
      <CreateUserDrawer
        open={drawerVisible}
        onClose={handleDrawerClose}
        onSuccess={fetchUsers}
      />
    </Card>
  );
}; 