import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, Calendar } from "lucide-react";
import type { SubscriptionInfo } from "@/types/search";

interface SubscriptionCardProps {
  subscription: SubscriptionInfo;
}



// export const sampleSubscription: SubscriptionInfo = {
//   plan_type: 'pro',
//   start_data: new Date(),
//   end_data: new Date(new Date().setDate(new Date().getDate() + 30)),
// };

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  console.log({subscription});
  const endDate = new Date(subscription.end_date);
  const daysRemaining = Math.floor((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const progressValue = (daysRemaining / 30) * 100;
  
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
              {subscription.plan_type==="premium_annual"?"Premium Annual":"Premium Monthly"}
            </p>
            <span className={`rounded-full px-2 py-1 text-xs ${
              true 
                ? 'bg-[#00FF9D]/10 text-[#00FF9D]' 
                : 'bg-red-500/10 text-red-400'
            }`}>
              {true ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          {/* {subscription.isActive && ( */}
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Days Remaining</span>
                  <span className="font-semibold text-white">{daysRemaining} days</span>
                </div>
                <Progress 
                  value={progressValue} 
                  className="h-2 bg-[#001845]"
                  // indicatorClassName="bg-[#00FF9D]"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Expires on {new Date(subscription.end_date).toLocaleDateString()}</span>
              </div>
            </>
          {/* )} */}
        </div>
      </CardContent>
    </Card>
  );
}