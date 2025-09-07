const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cron = require('node-cron');
const ContentStorage = require('./storage');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize storage
const storage = new ContentStorage();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Schedule daily premium check (runs every day at midnight)
cron.schedule('0 0 * * *', () => {
  console.log('Running daily premium check...');
  storage.markArticlesAsPremium();
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
    const article = storage.parseMarkdownContent(content);
    
    // Save article to persistent storage
    await storage.saveWebhookArticle(article);
    
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
    
    const filteredArticles = storage.getAllArticles(userIsPremium);
    
    res.json(filteredArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// API endpoint to get monthly data
app.get('/api/monthly-data', (req, res) => {
  res.json(storage.getMonthlyData());
});

// API endpoint for premium check
app.get('/api/article/:id/premium-check', (req, res) => {
  const { id } = req.params;
  const article = storage.getArticleById(id);
  
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
    uptime: process.uptime(),
    articlesCount: storage.getAllArticles(true).length
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

app.listen(PORT, async () => {
  // Initialize storage on server start
  await storage.initStorage();
  
  console.log(`Daily Brief server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/webhook/daily-update`);
  console.log('Daily premium check scheduled for midnight');
  console.log(`Loaded ${storage.getAllArticles(true).length} articles`);
});

module.exports = app;