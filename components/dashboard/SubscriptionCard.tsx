import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, Calendar } from "lucide-react";
import type { SubscriptionInfo } from "@/types/search";

interface SubscriptionCardProps {
  subscription: SubscriptionInfo;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const progressValue = (subscription.daysRemaining / 30) * 100;

  return (
    <Card className="col-span-4 bg-[#001233] border-[#001845]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">Subscription Status</CardTitle>
        <Crown className="h-6 w-6 text-[#00FF9D]" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white">
              {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
            </p>
            <span className={`rounded-full px-2 py-1 text-xs ${
              subscription.isActive 
                ? 'bg-[#00FF9D]/10 text-[#00FF9D]' 
                : 'bg-red-500/10 text-red-400'
            }`}>
              {subscription.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          {subscription.isActive && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Days Remaining</span>
                  <span className="font-semibold text-white">{subscription.daysRemaining} days</span>
                </div>
                <Progress 
                  value={progressValue} 
                  className="h-2 bg-[#001845]"
                  // indicatorClassName="bg-[#00FF9D]"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Expires on {new Date(subscription.expiryDate).toLocaleDateString()}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}