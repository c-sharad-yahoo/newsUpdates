const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for articles (in production, use a database)
let articles = [];
let monthlyData = [];

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Utility functions
const generateArticleId = (title, publishedAt) => {
  const dateStr = new Date(publishedAt).toISOString().split('T')[0];
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${dateStr}-${titleSlug}`;
};

const parseMarkdownContent = (markdown) => {
  // Extract title from first heading
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/📰|✨|🌍/g, '').trim() : 'Daily Brief Update';
  
  const publishedAt = new Date().toISOString();
  const date = new Date().toISOString().split('T')[0];
  
  // Extract excerpt from first paragraph after headers
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
  
  // Simple markdown to HTML conversion
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
    id: generateArticleId(title, publishedAt),
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
};

const addArticle = (newArticle) => {
  // Remove featured flag from existing articles
  articles = articles.map(article => ({
    ...article,
    featured: false
  }));
  
  // Add new article at the beginning
  articles.unshift(newArticle);
  
  // Update monthly data
  const existingMonthIndex = monthlyData.findIndex(
    m => m.month === newArticle.month && m.year === newArticle.year
  );
  
  if (existingMonthIndex >= 0) {
    monthlyData[existingMonthIndex].articleCount += 1;
    monthlyData[existingMonthIndex].featuredStory = newArticle.title;
  } else {
    monthlyData.unshift({
      month: newArticle.month,
      year: newArticle.year,
      articleCount: 1,
      premiumCount: 0,
      featuredStory: newArticle.title
    });
  }
};

const markArticlesAsPremium = () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  articles.forEach(article => {
    const publishDate = new Date(article.publishedAt);
    if (publishDate < sevenDaysAgo && !article.isPremium) {
      article.isPremium = true;
      
      // Update monthly data premium count
      const monthData = monthlyData.find(
        m => m.month === article.month && m.year === article.year
      );
      if (monthData) {
        monthData.premiumCount += 1;
      }
    }
  });
};

// Initialize with sample data
const initializeData = () => {
  const sampleArticle = {
    id: 'jan-20-todays-world-brief',
    title: "Today's World: 5-Minute Brief",
    excerpt: "China's Strategic Power Play Reshapes Global Order while India cuts GST rates to boost consumption.",
    content: '<h1>📰 Today\'s World: 5-Minute Brief</h1><p><em>January 20 2025 | Your Global Update</em></p>',
    date: '2025-01-20',
    publishedAt: new Date().toISOString(),
    readingTime: '5 min',
    category: 'Global News',
    month: 'January',
    year: '2025',
    featured: true,
    isPremium: false
  };
  
  articles = [sampleArticle];
  monthlyData = [{
    month: 'January',
    year: '2025',
    articleCount: 1,
    premiumCount: 0,
    featuredStory: sampleArticle.title
  }];
};

// Initialize data on startup
initializeData();

// Schedule daily premium check (runs every day at midnight)
cron.schedule('0 0 * * *', () => {
  console.log('Running daily premium check...');
  markArticlesAsPremium();
});

// Webhook endpoint for receiving daily updates
app.post('/api/webhook/daily-update', async (req, res) => {
  try {
    const { content, secret } = req.body;
    
    // Verify webhook secret (optional security measure)
    if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    // Parse markdown content
    const article = parseMarkdownContent(content);
    
    // Add article to memory storage
    addArticle(article);
    
    console.log(`New article added: ${article.title}`);
    
    res.json({
      success: true,
      message: 'Daily update processed successfully',
      article: {
        id: article.id,
        title: article.title,
        date: article.date,
        category: article.category
      }
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      error: 'Failed to process daily update',
      message: error.message
    });
  }
});

// API endpoint to get articles (filtered by user premium status)
app.get('/api/articles', async (req, res) => {
  try {
    const { isPremium = 'false' } = req.query;
    const userIsPremium = isPremium === 'true';
    
    let filteredArticles = articles;
    
    if (!userIsPremium) {
      filteredArticles = articles.filter(article => !article.isPremium);
    }
    
    res.json(filteredArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// API endpoint to get monthly data
app.get('/api/monthly-data', (req, res) => {
  res.json(monthlyData);
});

// API endpoint for premium check
app.get('/api/article/:id/premium-check', (req, res) => {
  const { id } = req.params;
  const article = articles.find(a => a.id === id);
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json({ 
    isPremium: article.isPremium,
    publishedAt: article.publishedAt 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Daily Brief server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/webhook/daily-update`);
  console.log('Daily premium check scheduled for midnight');
});

module.exports = app;