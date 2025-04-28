import { gql } from 'urql';
import { client } from '../graphql/client';
import { LoginInput, LoginResponse } from '../../types/auth';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
       
      }
      error
    }
  }
`;

export class AuthService {
  static async login(credentials: LoginInput): Promise<LoginResponse> {
    try {
      const result = await client.mutation(LOGIN_MUTATION, credentials).toPromise();
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.data?.login.error) {
        throw new Error(result.data.login.error);
      }

      return result.data?.login as LoginResponse;
    } catch (error) {
      throw error;
    }
  }
} 