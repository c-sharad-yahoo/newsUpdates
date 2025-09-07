export interface ImpactSummary {
  policy_developments: number;
  international_updates: number;
  economic_indicators: number;
  scientific_advances: number;
}

export interface PrimaryFocus {
  title: string;
  summary: string;
  content: string;
  key_terms: string[];
  exam_relevance: string;
}

export interface ArticleItem {
  title: string;
  summary: string;
  content: string;
  key_terms: string[];
  citations: number[];
}

export interface Section {
  id: string;
  title: string;
  summary: string;
  articles: ArticleItem[];
}

export interface RapidUpdate {
  category: string;
  content: string;
  citations: number[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  month: string;
  year: string;
  featured?: boolean;
  source?: string;
  
  // New JSON structure fields
  impact_summary: ImpactSummary;
  primary_focus: PrimaryFocus;
  sections: Section[];
  rapid_updates: RapidUpdate[];
  
  // Legacy fields for backward compatibility
  excerpt?: string;
  content?: string;
}

export interface MonthData {
  month: string;
  year: string;
  articleCount: number;
  featuredStory: string;
}