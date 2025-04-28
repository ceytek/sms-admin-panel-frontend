import { CreateSubscriptionPlanData, CreateSubscriptionPlanResponse, SubscriptionPlan } from '../types/auth.types';
import { gql } from '@apollo/client';
import { client } from '../lib/apolloClient';

const CREATE_SUBSCRIPTION_PLAN = gql`
  mutation CreateSubscriptionPlan($data: CreateSubscriptionPlanInput!) {
    createSubscriptionPlan(data: $data) {
      error
      plan {
        id
        name
        service_count
        price
        tax_rate
        total_price
        payment_period
        created_at
        updated_at
      }
    }
  }
`;

interface GetSubscriptionPlansResponse {
  subscriptionPlans: {
    error: string | null;
    plans: SubscriptionPlan[];
  };
}

const GET_SUBSCRIPTION_PLANS = gql`
  query GetSubscriptionPlans {
    subscriptionPlans {
      error
      plans {
        id
        name
        service_count
        price
        tax_rate
        total_price
        payment_period
        created_at
        updated_at
      }
    }
  }
`;

export const subscriptionService = {
  createPlan: async (data: { 
    name: string; 
    service_count: number;
    price: number;
    tax_rate: number;
    payment_period: 'MONTHLY' | 'ANNUAL';
  }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_SUBSCRIPTION_PLAN,
        variables: { data },
        refetchQueries: [{ query: GET_SUBSCRIPTION_PLANS }],
        awaitRefetchQueries: true
      });
      return response.data.createSubscriptionPlan;
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      return {
        error: 'Abonelik planı oluşturulurken bir hata oluştu',
        plan: null
      };
    }
  },

  getPlans: async () => {
    try {
      const { data } = await client.query({
        query: GET_SUBSCRIPTION_PLANS
      });
      return data.subscriptionPlans;
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      return {
        error: 'Abonelik planları yüklenirken bir hata oluştu',
        plans: []
      };
    }
  }
}; 