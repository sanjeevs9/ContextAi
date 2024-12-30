import { SubscriptionInfo } from '@/types/search';

export const sampleSubscription: SubscriptionInfo = {
  plan_type: 'premium_annual',
  start_date: new Date(),
  end_date: new Date(new Date().setDate(new Date().getDate() + 365)),
};
