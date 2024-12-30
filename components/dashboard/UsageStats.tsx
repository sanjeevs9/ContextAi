// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { BarChart, Clock } from "lucide-react";
// import type { SubscriptionInfo } from "@/types/search";

// interface UsageStatsProps {
//   subscription: SubscriptionInfo;
// }

// export function UsageStats({ subscription }: UsageStatsProps) {
//   const usagePercentage = (subscription.usageCount / subscription.usageLimit) * 100;

//   return (
//     <Card className="col-span-4 h-full bg-[#001233] border-[#001845]">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-2xl font-bold text-white">Usage Statistics</CardTitle>
//         <BarChart className="h-6 w-6 text-[#00FF9D]" />
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-300">Monthly Usage</span>
//               <span className="font-semibold text-white">
//                 {subscription.usageCount} / {subscription.usageLimit}
//               </span>
//             </div>
//             <Progress 
//               value={usagePercentage} 
//               className="h-2 bg-[#001845]"
//               // indicatorClassName="bg-[#00FF9D]"
//             />
//           </div>
          
//           <div className="flex items-center space-x-2 text-sm text-gray-400">
//             <Clock className="h-4 w-4" />
//             <span>Last updated: {new Date().toLocaleString()}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }