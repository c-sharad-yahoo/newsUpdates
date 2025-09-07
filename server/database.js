const Database = require('better-sqlite3');
const path = require('path');

class ArticleDatabase {
  constructor() {
    // Use persistent storage path
    const dbPath = process.env.NODE_ENV === 'production' 
      ? '/opt/render/project/data/articles.db'
      : path.join(__dirname, '../data/articles.db');
    
    this.db = new Database(dbPath);
    this.initTables();
  }

  initTables() {
    // Create articles table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL,
        publishedAt TEXT NOT NULL,
        readingTime TEXT NOT NULL,
        category TEXT NOT NULL,
        month TEXT NOT NULL,
        year TEXT NOT NULL,
        featured INTEGER DEFAULT 0,
        isPremium INTEGER DEFAULT 0
      )
    `);

    // Create monthly_data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS monthly_data (
        id TEXT PRIMARY KEY,
        month TEXT NOT NULL,
        year TEXT NOT NULL,
        articleCount INTEGER DEFAULT 0,
        premiumCount INTEGER DEFAULT 0,
        featuredStory TEXT
      )
    `);
  }

  addArticle(article) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO articles 
      (id, title, excerpt, content, date, publishedAt, readingTime, category, month, year, featured, isPremium)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      article.id, article.title, article.excerpt, article.content,
      article.date, article.publishedAt, article.readingTime, article.category,
      article.month, article.year, article.featured ? 1 : 0, article.isPremium ? 1 : 0
    );

    this.updateMonthlyData(article);
  }

  updateMonthlyData(article) {
    const monthId = `${article.month}-${article.year}`;
    
    // Check if month exists
    const existing = this.db.prepare('SELECT * FROM monthly_data WHERE id = ?').get(monthId);
    
    if (existing) {
      this.db.prepare(`
        UPDATE monthly_data 
        SET articleCount = articleCount + 1, featuredStory = ?
        WHERE id = ?
      `).run(article.title, monthId);
    } else {
      this.db.prepare(`
        INSERT INTO monthly_data (id, month, year, articleCount, premiumCount, featuredStory)
        VALUES (?, ?, ?, 1, 0, ?)
      `).run(monthId, article.month, article.year, article.title);
    }
  }

  getAllArticles(isPremium = false) {
    const query = isPremium 
      ? 'SELECT * FROM articles ORDER BY publishedAt DESC'
      : 'SELECT * FROM articles WHERE isPremium = 0 ORDER BY publishedAt DESC';
    
    return this.db.prepare(query).all().map(row => ({
      ...row,
      featured: Boolean(row.featured),
      isPremium: Boolean(row.isPremium)
    }));
  }

  getMonthlyData() {
    return this.db.prepare('SELECT * FROM monthly_data ORDER BY year DESC, month DESC').all();
  }

  markArticlesAsPremium() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    this.db.prepare(`
      UPDATE articles 
      SET isPremium = 1 
      WHERE publishedAt < ? AND isPremium = 0
    `).run(sevenDaysAgo);
  }
}

module.exports = ArticleDatabase;