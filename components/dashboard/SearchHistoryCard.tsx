import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { SearchHistoryItem } from "./SearchHistoryItem";
import type { SearchResult } from "@/types/search";

interface SearchHistoryCardProps {
  searches: SearchResult[];
}

export function SearchHistoryCard({ searches }: SearchHistoryCardProps) {
  const recentSearches = searches.slice(0, 10);
  
  return (
    <Card className="col-span-8 bg-[#001233] border-[#001845]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">Recent Searches</CardTitle>
        <History className="h-6 w-6 text-[#00FF9D]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6 overflow-hidden">
          {recentSearches.map((search) => (
            <SearchHistoryItem key={search.id} search={search} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}