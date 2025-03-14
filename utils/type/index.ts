export interface FactCheckRequest {
    text: string;
    url?: string;
    domain?: string;
  }
  
  export interface FactCheckResponse {
    factualScore: number;
    isOpinion: boolean;
    explanation: string;
    detailed_explanation?: string;
    references?: string[];
    sourceCredibility?: {
    score: number;
    label: 'High' | 'Medium' | 'Low' | 'Unknown';
   
  };
  cache_id?: string;
}
