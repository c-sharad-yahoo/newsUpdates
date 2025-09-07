const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');

class ContentStorage {
  constructor() {
    this.webhookArticlesFile = path.join(__dirname, '../data/webhook-articles.json');
    this.staticArticlesFile = path.join(__dirname, '../src/data/initial_articles.json');
    this.monthlyDataFile = path.join(__dirname, '../data/monthly-data.json');
    this.articles = [];
    this.monthlyData = [];
  }

  async initStorage() {
    try {
      // Ensure data directory exists
      await fs.mkdir(path.dirname(this.webhookArticlesFile), { recursive: true });
      
      // Initialize webhook articles file if it doesn't exist
      try {
        await fs.access(this.webhookArticlesFile);
      } catch {
        await fs.writeFile(this.webhookArticlesFile, JSON.stringify([], null, 2));
      }

      // Initialize monthly data file if it doesn't exist
      try {
        await fs.access(this.monthlyDataFile);
      } catch {
        await fs.writeFile(this.monthlyDataFile, JSON.stringify([], null, 2));
      }

      // Load all articles into memory
      await this.loadAllArticles();
      
      console.log(`Storage initialized with ${this.articles.length} articles`);
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  async loadAllArticles() {
    try {
      // Load static articles
      const staticArticles = await this.getStaticArticles();
      
      // Load webhook articles
      const webhookArticles = await this.getWebhookArticles();
      
      // Combine and sort by publishedAt date (newest first)
      this.articles = [...webhookArticles, ...staticArticles]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      // Generate monthly data
      await this.generateMonthlyData();
      
    } catch (error) {
      console.error('Error loading articles:', error);
      this.articles = [];
    }
  }

  async getStaticArticles() {
    try {
      const data = await fs.readFile(this.staticArticlesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log('No static articles found or error reading file:', error.message);
      return [];
    }
  }

  async getWebhookArticles() {
    try {
      const data = await fs.readFile(this.webhookArticlesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log('No webhook articles found or error reading file:', error.message);
      return [];
    }
  }

  async saveWebhookArticle(article) {
    try {
      const webhookArticles = await this.getWebhookArticles();
      
      // Add new article to beginning
      webhookArticles.unshift(article);
      
      // No automatic pruning - keep all articles
      const limitedArticles = webhookArticles;
      
      // Save to file
      await fs.writeFile(this.webhookArticlesFile, JSON.stringify(limitedArticles, null, 2));
      
      // Reload all articles to update in-memory cache
      await this.loadAllArticles();
      
      console.log(`Webhook article saved: ${article.title}`);
      return this.articles;
    } catch (error) {
      console.error('Error saving webhook article:', error);
      throw error;
    }
  }

  async generateMonthlyData() {
    const monthlyMap = new Map();
    
    this.articles.forEach(article => {
      const key = `${article.month}-${article.year}`;
      
      if (!monthlyMap.has(key)) {
        monthlyMap.set(key, {
          month: article.month,
          year: article.year,
          articleCount: 0,
          featuredStory: ''
        });
      }
      
      const monthData = monthlyMap.get(key);
      monthData.articleCount++;
      
      // Set featured story to the first (newest) article of the month
      if (!monthData.featuredStory) {
        monthData.featuredStory = article.title;
      }
    });
    
    this.monthlyData = Array.from(monthlyMap.values())
      .sort((a, b) => {
        // Sort by year desc, then by month desc
        if (a.year !== b.year) {
          return b.year.localeCompare(a.year);
        }
        const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
      });
    
    // Save monthly data to file
    try {
      await fs.writeFile(this.monthlyDataFile, JSON.stringify(this.monthlyData, null, 2));
    } catch (error) {
      console.error('Error saving monthly data:', error);
    }
  }

  getAllArticles() {
    return this.articles;
  }

  getMonthlyData() {
    return this.monthlyData;
  }

  getArticleById(id) {
    return this.articles.find(article => article.id === id);
  }


  processJsonContent(jsonData) {
    const publishedAt = new Date().toISOString();
    const date = new Date().toISOString().split('T')[0];
    const month = new Date(date).toLocaleDateString('en-US', { month: 'long' });
    const year = new Date(date).getFullYear().toString();
    
    // Extract reading time and category from the rich JSON structure
    const readingTime = jsonData.meta?.reading_time || '5 min';
    const category = jsonData.primary_focus?.category || 'General Studies';
    const excerpt = jsonData.primary_focus?.summary || 'Today\'s essential news analysis and global updates.';
    
    return {
      id: this.generateArticleId(jsonData.title, publishedAt),
      title: jsonData.title,
      date: jsonData.date || date,
      publishedAt,
      readingTime,
      category,
      month,
      year,
      featured: true,
      source: 'webhook',
      excerpt,
      
      // Rich JSON structure - store all fields
      meta: jsonData.meta || {
        word_count: "1500",
        reading_time: readingTime,
        generated_at: publishedAt
      },
      impact_summary: jsonData.impact_summary,
      primary_focus: jsonData.primary_focus,
      sections: jsonData.sections || [],
      rapid_updates: jsonData.rapid_updates || [],
      knowledge_synthesis: jsonData.knowledge_synthesis || {},
      weekly_analysis: jsonData.weekly_analysis || {},
      exam_intelligence: jsonData.exam_intelligence || {
        new_concepts: "",
        static_dynamic_connections: "",
        question_probability: "",
        factual_database: "",
        comparative_analysis: ""
      }
    };
  }

  generateArticleId(title, publishedAt) {
    const dateStr = new Date(publishedAt).toISOString().split('T')[0];
    const titleSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    return `${dateStr}-${titleSlug}`;
  }
}

module.exports = ContentStorage;