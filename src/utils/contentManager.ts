import { Article } from '../types';

export class ContentManager {
  private static readonly PREMIUM_THRESHOLD_DAYS = 7;

  static isArticlePremium(publishedAt: string): boolean {
    const publishDate = new Date(publishedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= this.PREMIUM_THRESHOLD_DAYS;
  }

  static filterArticlesForUser(articles: Article[], isPremium: boolean): Article[] {
    if (isPremium) {
      return articles;
    }
    
    return articles.filter(article => !this.isArticlePremium(article.publishedAt));
  }

  static getLatestArticles(articles: Article[], limit: number = 5): Article[] {
    return articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }

  static generateArticleId(title: string, date: string): string {
    const dateStr = new Date(date).toISOString().split('T')[0];
    const titleSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    return `${dateStr}-${titleSlug}`;
  }

  static parseMarkdownContent(markdown: string): Partial<Article> {
    // Extract title from first heading
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/📰|✨|🌍/g, '').trim() : 'Daily Brief Update';
    
    // Extract date from subtitle or use current date
    const dateMatch = markdown.match(/\*([^|]+)\|/);
    const publishedAt = new Date().toISOString();
    const date = new Date().toISOString().split('T')[0];
    
    // Extract excerpt from first substantial paragraph
    const contentLines = markdown.split('\n').filter(line => line.trim());
    const firstParagraph = contentLines.find(line => 
      !line.startsWith('#') && 
      !line.startsWith('*') && 
      !line.startsWith('**') && 
      !line.startsWith('---') &&
      line.length > 50
    );
    
    const excerpt = firstParagraph 
      ? firstParagraph.substring(0, 200) + '...'
      : 'Today\'s essential news analysis and global updates.';
    
    // Convert markdown to HTML (simplified)
    const content = markdown
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>');
    
    // Determine category based on content
    let category = 'Global News';
    const lowerContent = markdown.toLowerCase();
    if (lowerContent.includes('technology') || lowerContent.includes('ai') || lowerContent.includes('tech')) {
      category = 'Technology';
    } else if (lowerContent.includes('economy') || lowerContent.includes('market') || lowerContent.includes('trade')) {
      category = 'Economics';
    } else if (lowerContent.includes('climate') || lowerContent.includes('environment')) {
      category = 'Environment';
    } else if (lowerContent.includes('health') || lowerContent.includes('medical')) {
      category = 'Health';
    }
    
    const month = new Date(date).toLocaleDateString('en-US', { month: 'long' });
    const year = new Date(date).getFullYear().toString();
    
    return {
      id: this.generateArticleId(title, date),
      title,
      excerpt,
      content,
      date,
      publishedAt,
      readingTime: '5 min',
      category,
      month,
      year,
      featured: true,
      isPremium: false
    };
  }
}