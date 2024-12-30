import { SubscriptionCard } from "./SubscriptionCard";
import { SearchHistoryCard } from "./SearchHistoryCard";
import type { SearchResult, SubscriptionInfo } from "@/types/search";

interface DashboardProps {
  subscription: SubscriptionInfo;
  searchHistory: SearchResult[];
}

export function Dashboard({ subscription, searchHistory }: DashboardProps) {
  return (
    <div className="bg-[#000B1D] w-full ">
      <div className="container mx-auto py-8 px-4 md:w-3/4">

        <div className="flex flex-col gap-4 " >
          <div className="flex flex-row justify-between w-full gap-4 ">
            <div className="w-full md:w-1/2">
              <SubscriptionCard subscription={subscription} />
            </div>
              {/* <div className="w-1/2">
                <UsageStats subscription={subscription} />
              </div> */}
          
          </div>
          <SearchHistoryCard searches={searchHistory} />
        </div>
      </div>
    </div>
  );
}