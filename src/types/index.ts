export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
  month: string;
  year: string;
  featured?: boolean;
  isPremium?: boolean;
  publishedAt: string;
}

export interface MonthData {
  month: string;
  year: string;
  articleCount: number;
  featuredStory: string;
  premiumCount: number;
}

export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  subscriptionExpiry?: string;
}