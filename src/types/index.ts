export interface Meta {
  word_count: string;
  reading_time: string;
  generated_at: string;
}

export interface ImpactSummary {
  policy_developments: number;
  international_updates: number;
  economic_indicators: number;
  scientific_advances: number;
}

export interface PrimaryFocus {
  title: string;
  category: string;
  summary: string;
  content: string;
  exam_relevance: string;
  multi_dimensional_impact: string;
  key_terms: string[];
  historical_context: string;
  future_implications: string;
  citations: number[];
}

export interface ArticleItem {
  title: string;
  summary: string;
  key_terms: string[];
  citations: number[];
  content?: string;
  // Allow any additional string properties for dynamic content
  [key: string]: string | string[] | number[] | undefined;
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

export interface ExamIntelligence {
  new_concepts: string;
  static_dynamic_connections: string;
  question_probability: string;
  factual_database: string;
  comparative_analysis: string;
}

export interface KnowledgeSynthesis {
  cross_subject_connections?: string;
  historical_parallels?: string;
  predictive_analysis?: string;
  debate_points?: string;
}

export interface WeeklyAnalysis {
  emerging_trends?: string;
  policy_trajectory?: string;
  economic_indicators?: string;
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
  
  // Rich JSON structure fields
  meta: Meta;
  impact_summary: ImpactSummary;
  primary_focus: PrimaryFocus;
  sections: Section[];
  rapid_updates: RapidUpdate[];
  exam_intelligence: ExamIntelligence;
  knowledge_synthesis?: KnowledgeSynthesis;
  weekly_analysis?: WeeklyAnalysis;
  
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

export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  subscriptionExpiry?: string;
}