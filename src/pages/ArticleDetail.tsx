import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Twitter, MessageCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Article } from '../types';
import PremiumGate from '../components/PremiumGate';

const ArticleDetail: React.FC = () => {
  const { year, month, id } = useParams<{ year: string; month: string; id: string }>();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const result = await response.json();
        setArticles(result);
        
        // Find the specific article
        const foundArticle = result.find((a: Article) => a.id === id);
        setArticle(foundArticle || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  const currentIndex = articles.findIndex(a => a.id === id);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const relatedArticles = articles
    .filter(a => a.category === article?.category && a.id !== id)
    .slice(0, 3);

  const capitalizeMonth = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or may have been moved.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = article.title;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${year}/${month}`} className="hover:text-blue-600 transition-colors">
            {capitalizeMonth(month || '')} {year?.charAt(0).toUpperCase() + year?.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Article</span>
        </nav>

        {/* Article Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {article.readingTime}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share:
            </span>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              <span>Telegram</span>
            </button>
          </div>
        </div>

        {/* Article Content */}
        {article.isPremium && !user?.isPremium ? (
          <PremiumGate
            title="Premium Article"
            description="This article has been moved to our premium archive. Upgrade to access all archived content."
          >
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </PremiumGate>
        ) : (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {previousArticle ? (
              <Link
                to={`/${previousArticle.year.toLowerCase()}/${previousArticle.month.toLowerCase()}/${previousArticle.id}`}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm font-medium">Previous Article</div>
                  <div className="text-sm line-clamp-1">{previousArticle.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextArticle && (
              <Link
                to={`/${nextArticle.year.toLowerCase()}/${nextArticle.month.toLowerCase()}/${nextArticle.id}`}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors group text-right"
              >
                <div>
                  <div className="text-sm font-medium">Next Article</div>
                  <div className="text-sm line-clamp-1">{nextArticle.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/${relatedArticle.year.toLowerCase()}/${relatedArticle.month.toLowerCase()}/${relatedArticle.id}`}
                  className="group"
                >
                  <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        {relatedArticle.category}
                      </span>
                      <span className="text-xs text-gray-500">{relatedArticle.readingTime}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;