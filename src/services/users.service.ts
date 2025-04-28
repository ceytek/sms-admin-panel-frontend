import { authService } from './auth.service';

const GET_USERS_QUERY = `
  query GetUsers {
    users {
      error
      users {
        id
        username
        created_at
        updated_at
        company {
          id
          company_name
          company_email
          company_phone
          company_address
          authorized_person
          subscription {
            id
            status
            start_date
            end_date
            subscription_plan {
              id
              name
              service_count
            }
          }
        }
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION_STATUS = `
  mutation UpdateSubscriptionStatus($companyId: String!, $status: SubscriptionStatus!) {
    updateSubscriptionStatus(companyId: $companyId, status: $status) {
      success
      error
      subscription {
        id
        status
        start_date
        end_date
        subscription_plan {
          id
          name
          service_count
        }
      }
    }
  }
`;

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

interface UsersResponse {
  error?: string;
  users?: User[];
}

interface UpdateSubscriptionResponse {
  success: boolean;
  error?: string;
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
}

export const usersService = {
  getUsers: async (): Promise<UsersResponse> => {
    try {
      const token = authService.getToken();
      const response = await fetch(process.env.REACT_APP_API_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: GET_USERS_QUERY
        }),
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data.users;
    } catch (error) {
      console.error('Get users error:', error);
      return {
        error: error instanceof Error ? error.message : 'Kullanıcılar alınamadı'
      };
    }
  },

  updateSubscriptionStatus: async (companyId: string, status: 'ACTIVE' | 'INACTIVE'): Promise<UpdateSubscriptionResponse> => {
    try {
      const token = authService.getToken();
      const response = await fetch(process.env.REACT_APP_API_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: UPDATE_SUBSCRIPTION_STATUS,
          variables: {
            companyId,
            status
          }
        }),
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data.updateSubscriptionStatus;
    } catch (error) {
      console.error('Update subscription status error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Abonelik durumu güncellenemedi'
      };
    }
  }
}; 