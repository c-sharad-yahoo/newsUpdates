# Daily Brief - Modern News Analysis Website

A modern, responsive news analysis website built with React, TypeScript, and Tailwind CSS. Designed for students and young professionals who need quick, educational news analysis.

## Features

- 🎨 Apple-inspired minimalist design
- 📱 Fully responsive (mobile-first)
- ⚡ Fast loading with optimized performance
- 🔍 Search functionality and category filtering
- 📧 Newsletter signup integration
- 🔗 Social sharing capabilities
- 📊 SEO-friendly URLs and meta tags
- 🎯 Content management through data files

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Static hosting ready

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server with backend**:
   ```bash
   npm run dev:server
   ```

   Or start frontend and backend separately:
   ```bash
   npm run dev        # Frontend only
   npm run server     # Backend only
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Automated Daily Updates

The website now supports automated daily updates via webhook. Here's how it works:

### Webhook Endpoint

**URL**: `POST /api/webhook/daily-update`

**Payload**:
```json
{
  "content": "# 📰 Today's World: 5-Minute Brief\n*September 7 2025 | Your Global Update*\n\n...",
  "secret": "your-webhook-secret"
}
```

### Content Format

Send markdown content in the format you provided. The system will:
- Parse the markdown content
- Extract title, date, and category automatically
- Convert to HTML and sanitize
- Add to the articles database
- Update monthly archives automatically
- Set the new article as featured

### Testing the Webhook

1. **Start the server**:
   ```bash
   npm run server
   ```

2. **Test with the provided script**:
   ```bash
   node webhook-test.js
   ```

3. **Or use curl**:
   ```bash
   curl -X POST http://localhost:3001/api/webhook/daily-update \
     -H "Content-Type: application/json" \
     -d '{"content": "# Your markdown content here", "secret": "test-secret"}'
   ```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PORT=3001
WEBHOOK_SECRET=your-secure-secret-here
```

### Automated Features

- **Daily Updates**: Webhook processes new content every 14 hours
- **Monthly Archives**: Automatically creates new month sections
- **Content Management**: No manual file editing required
- **Featured Articles**: Latest article is always featured
- **Category Detection**: Automatically categorizes content
- **SEO Optimization**: Generates proper URLs and meta data

## Content Management

### Manual Article Addition (Legacy)

Edit `src/data/articles.ts` to add new articles:

```typescript
{
  id: 'unique-article-id',
  title: 'Your Article Title',
  excerpt: 'Brief description for previews',
  content: 'Full article content...',
  date: '2025-01-20', // YYYY-MM-DD format
  readingTime: '5 min',
  category: 'Technology',
  month: 'January',
  year: '2025',
  featured: false // Set to true for featured articles
}
```

### Updating Site Branding

1. **Site Title**: Update `index.html` and header components
2. **Logo**: Modify the logo in `src/components/Header.tsx`
3. **Colors**: Customize the color scheme in `tailwind.config.js`
4. **Content**: Update homepage hero section in `src/pages/Home.tsx`

### Webhook Integration

For automated updates, integrate with your AI content generation system:

1. **Set up webhook URL**: `https://your-domain.com/api/webhook/daily-update`
2. **Configure secret**: Set `WEBHOOK_SECRET` environment variable
3. **Schedule updates**: Send POST requests every 14 hours
4. **Monitor logs**: Check server logs for processing status

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── NewsletterSignup.tsx # Email subscription
├── pages/              # Main page components
│   ├── Home.tsx        # Homepage
│   ├── MonthView.tsx   # Monthly article listing
│   ├── ArticleDetail.tsx # Individual article page
│   ├── About.tsx       # About page
│   ├── Archive.tsx     # Archive overview
│   └── Subscribe.tsx   # Subscription page
├── data/
│   └── articles.ts     # Article content and data
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main app component
└── server/             # Backend server
    ├── index.js        # Express server
    └── middleware/     # Authentication middleware
```

## API Endpoints

- `POST /api/webhook/daily-update` - Receive daily content updates
- `GET /api/articles` - Fetch all articles
- `GET /api/health` - Server health check

## Customization

### Colors
The site uses a clean color palette:
- Primary Blue: `#007AFF`
- Background White: `#FFFFFF`
- Light Gray: `#F5F5F7`
- Dark Text: `#1D1D1F`

### Typography
- Clean, readable fonts optimized for news content
- Proper hierarchy with consistent spacing
- Mobile-optimized text sizes

### Layout
- Responsive grid system
- Card-based design with subtle shadows
- Smooth animations and hover effects

## Deployment

The site is ready for deployment to any static hosting service:

- **Netlify**: Connect your Git repository
- **Vercel**: Import project and deploy
- **GitHub Pages**: Use the build output
- **AWS S3**: Upload the `dist` folder

## SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Clean, descriptive URLs
- Fast loading times
- Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this code for your own projects.

## Support

For questions or issues, please check the documentation or create an issue in the repository.