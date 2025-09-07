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
  publishedAt: string;
}

export interface MonthData {
  month: string;
  year: string;
  articleCount: number;
  featuredStory: string;
}