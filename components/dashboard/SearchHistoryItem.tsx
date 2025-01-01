import { CheckCircle, AlertCircle, Link } from "lucide-react";
import type { SearchResult } from "@/types/search";

interface SearchHistoryItemProps {
  search: SearchResult;
}

export function SearchHistoryItem({ search }: SearchHistoryItemProps) {

  return (
    <div className="border-b border-[#001845] pb-4 last:border-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p className="font-medium text-lg text-white">{search.query_text}</p>
          
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <span className={`inline-flex items-center space-x-1 text-sm ${
              search.result_type === "true" 
                ? 'text-[#00FF9D]' 
                : 'text-amber-400'
            }`}>
              {search.result_type === "true" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <span>{search.result_type === "true" ? 'Fact' : 'Opinion'}</span>
            </span>
            <span className="text-sm text-gray-400">
              Confidence: {search.confidence_score}%
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-2">{search.explanation || search.detailed_explanation}</p>
      
      {search.reference_sources && Array.isArray(search.reference_sources) && (
        <div className="mt-3 flex items-start space-x-2">
          <Link className="h-4 w-4 text-[#00FF9D] mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300 mb-1">References:</p>
            <ul className="space-y-1">
              {search.reference_sources.map((ref, idx) => {
                console.log(ref);
                
                // Handle different reference formats
                let url = '';
                let displayText = '';
                
                if (typeof ref === 'string') {
                  // Handle plain string URLs
                  url = ref;
                  displayText = ref;
                } else if (typeof ref === 'object' && ref !== null) {
                  // Handle object format with link and source
                  url = ref.link || '';
                  displayText = ref.source || ref.link || '';
                }

                // If no valid URL was found, try to extract one from the display text
                if (!url) {
                  const urlMatch = displayText.match(/(https?:\/\/[^\s]+)/);
                  url = urlMatch ? urlMatch[0] : '';
                }
                
                return (
                  <li key={idx} className="text-sm text-gray-400 truncate">
                    {url ? (
                      <a 
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00FF9D] transition-colors"
                      >
                        {displayText}
                      </a>
                    ) : (
                      <span>{displayText}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}