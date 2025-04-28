import { LoginCredentials, LoginResponse, UserWithoutPassword } from '../types/auth.types';
import { gql } from '@apollo/client';

const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error
      token
      user {
        id
        username
        created_at
        updated_at
        role {
          id
          name
          description
        }
        company {
          id
          company_name
          company_email
        }
      }
    }
  }
`;

const GET_CURRENT_USER_QUERY = gql`
  query Me {
    me {
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
`;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: {
            username: credentials.username,
            password: credentials.password
          }
        }),
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      if (data?.login?.error) {
        throw new Error(data.login.error);
      }

      if (data?.login?.user?.role?.name !== 'admin') {
        return {
          error: 'Yetkiniz yok. Sadece admin kullanıcıları giriş yapabilir.',
          token: null,
          user: null
        };
      }

      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
      }

      return data.login;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Giriş işlemi başarısız oldu',
      };
    }
  },

  getCurrentUser: async (): Promise<UserWithoutPassword | null> => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      const response = await fetch(process.env.REACT_APP_API_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: GET_CURRENT_USER_QUERY
        }),
      });

      const { data, errors } = await response.json();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data.getCurrentUser;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
}; 