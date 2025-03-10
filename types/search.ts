export interface SearchResult {
    id: string;
    query_text: string;
    confidence_score: number;
    result_type: "true" | "false";
    explanation: string;
    reference_sources: string[];
    timestamp: string;
    category?: string;
    detailed_explanation?: string;
  }
  
  export interface SubscriptionInfo {
    plan_type:string;
    start_date:Date;
    end_date:Date;
  }