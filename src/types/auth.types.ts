export interface LoginCredentials {
  username: string;
  password: string;
 
}

export interface LoginResponse {
  error?: string | null;
  token?: string | null;
  user?: UserWithoutPassword | null;
}

export interface UserWithoutPassword {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
  company?: Company | null;
}

export interface Company {
  id: string;
  company_name: string;
  company_email: string;
}

export interface RegisterCompanyData {
  user: {
    username: string;
    password: string;
    role_id: string;
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

export interface RegisterCompanyResponse {
  success: boolean;
  message: string;
  company?: Company;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  service_count: number;
  price: number;
  tax_rate: number;
  total_price: number;
  payment_period: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionPlanData {
  name: string;
  service_count: number;
}

export interface CreateSubscriptionPlanResponse {
  error?: string;
  plan?: SubscriptionPlan;
} 