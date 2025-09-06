// Optional authentication middleware for webhook security
const authenticateWebhook = (req, res, next) => {
  const { secret } = req.body;
  const expectedSecret = process.env.WEBHOOK_SECRET;
  
  if (expectedSecret && secret !== expectedSecret) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid webhook secret' 
    });
  }
  
  next();
};

module.exports = { authenticateWebhook };