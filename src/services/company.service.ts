import { gql } from '@apollo/client';
import { client } from '../lib/apolloClient';

// Type definitions
export interface RegisterCompanyInput {
  user: {
    username: string;
    password: string;
    role_id?: string;
  };
  company: {
    company_name: string;
    company_email: string;
    company_phone: string;
    company_address: string;
    authorized_person: string;
    province: string;
    district: string;
  };
  subscription: {
    plan_id: string;
  };
}

export interface Company {
  id: string;
  company_name: string;
  company_email: string;
}

export interface RegisterCompanyResponse {
  success: boolean;
  message?: string;
  company?: Company;
}

export interface RegisterFormData {
  username: string;
  password: string;
  role_id: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyAuthorizedPerson: string;
  province: string;
  district: string;
  plan_id: string;
}

const REGISTER_COMPANY_MUTATION = gql`
  mutation RegisterCompany($data: RegisterCompanyInput!) {
    registerCompany(data: $data) {
      success
      message
      company {
        id
        company_name
        company_email
      }
    }
  }
`;

const companyService = {
  register: async (formData: RegisterFormData): Promise<RegisterCompanyResponse> => {
    try {
      const registrationData: RegisterCompanyInput = {
        user: {
          username: formData.username,
          password: formData.password,
          role_id: formData.role_id
        },
        company: {
          company_name: formData.companyName,
          company_email: formData.companyEmail,
          company_phone: formData.companyPhone,
          company_address: formData.companyAddress,
          authorized_person: formData.companyAuthorizedPerson,
          province: formData.province,
          district: formData.district,
        },
        subscription: {
          plan_id: formData.plan_id
        },
      };

      const { data } = await client.mutate({
        mutation: REGISTER_COMPANY_MUTATION,
        variables: { data: registrationData }
      });

      return data.registerCompany;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during registration',
      };
    }
  },
};

export default companyService;