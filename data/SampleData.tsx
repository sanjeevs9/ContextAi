import { SearchResult, SubscriptionInfo } from '@/types/search';

export const sampleSubscription: SubscriptionInfo = {
  isActive: true,
  daysRemaining: 25,
  plan: 'pro',
  expiryDate: '2024-05-15',
  usageLimit: 1000,
  usageCount: 385,
};

export const sampleSearches: SearchResult[] = [
  {
    id: '1',
    queryText: "Is artificial intelligence dangerous?",
    confidenceScore: 0.78,
    resultType: "isOpinion",
    explanation: "The potential dangers of AI are widely debated among experts, with varying perspectives on its risks and benefits.",
    references: [
      "https://www.nature.com/articles/d41586-021-00530-0",
      "https://www.science.org/doi/10.1126/science.aap9559"
    ],
    timestamp: "2024-04-20T15:30:00Z",
    category: "Technology"
  },
  {
    id: '2',
    queryText: "What is the speed of light?",
    confidenceScore: 0.99,
    resultType: "isFact",
    explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second.",
    references: [
      "https://physics.nist.gov/cgi-bin/cuu/Value?c",
      "https://www.nasa.gov/feature/goddard/2019/how-fast-is-the-speed-of-light"
    ],
    timestamp: "2024-04-19T12:45:00Z",
    category: "Science"
  },
  {
    id: '3',
    queryText: "Do violent video games cause aggression?",
    confidenceScore: 0.65,
    resultType: "isOpinion",
    explanation: "Research shows mixed results regarding the relationship between video games and aggressive behavior.",
    references: [
      "https://www.apa.org/news/press/releases/2020/03/violent-video-games-behavior",
      "https://www.who.int/news-room/questions-and-answers/item/addictive-behaviours-gaming-disorder"
    ],
    timestamp: "2024-04-18T09:15:00Z",
    category: "Psychology"
  },
  {
    id: '4',
    queryText: "What causes climate change?",
    confidenceScore: 0.97,
    resultType: "isFact",
    explanation: "Climate change is primarily caused by greenhouse gas emissions from human activities.",
    references: [
      "https://climate.nasa.gov/causes/",
      "https://www.ipcc.ch/report/ar6/wg1/"
    ],
    timestamp: "2024-04-17T16:20:00Z",
    category: "Environment"
  },
  {
    id: '5',
    queryText: "Is organic food healthier?",
    confidenceScore: 0.72,
    resultType: "isOpinion",
    explanation: "While organic food may have fewer pesticides, research is mixed on overall health benefits compared to conventional foods.",
    references: [
      "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/organic-food/art-20043880",
      "https://www.fda.gov/food/buy-store-serve-safe-food/organic-food-facts"
    ],
    timestamp: "2024-04-16T14:10:00Z",
    category: "Health"
  }
];