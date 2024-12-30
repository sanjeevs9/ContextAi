import { SubscriptionInfo } from '@/types/search';

export const sampleSubscription: SubscriptionInfo = {
  plan_type: 'premium_annual',
  start_data: new Date(),
  end_data: new Date(new Date().setDate(new Date().getDate() + 365)),
};
