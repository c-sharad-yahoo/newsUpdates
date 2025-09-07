import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import { useArticles, useMonthlyData } from '../hooks/useArticles';

const Home: React.FC = () => {
  const { articles, loading: articlesLoading } = useArticles();
  const { monthlyData, loading: monthlyLoading } = useMonthlyData();
  
  const latestArticle = articles.length > 0 ? articles[0] : null;
  const isLoading = articlesLoading || monthlyLoading;

  // Generate excerpt for display
  const getArticleExcerpt = (article: any) => {
    // Prioritize primary_focus.summary for rich JSON structure
    if (article.primary_focus?.summary) return article.primary_focus.summary;
    if (article.excerpt) return article.excerpt;
    return 'Comprehensive current affairs analysis for competitive exam preparation.';
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Today's General Studies
              <span className="text-blue-600 block">Brief</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Daily current affairs analysis for competitive exam preparation. 
              Stay updated with comprehensive coverage of national and international developments.
            </p>
            {latestArticle ? (
              <Link
                to={`/${latestArticle.year.toLowerCase()}/${latestArticle.month.toLowerCase()}/${latestArticle.id}`}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Read Today's Brief
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <div className="inline-flex items-center px-8 py-4 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed">
                No Articles Available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Updates</h2>
            <p className="text-lg text-gray-600">
              Latest current affairs analysis and exam-focused content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                to={`/${article.year.toLowerCase()}/${article.month.toLowerCase()}/${article.id}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readingTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {getArticleExcerpt(article)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Archive Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Month</h2>
            <p className="text-lg text-gray-600">
              Explore archived content organized by month and year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyData.length > 0 ? monthlyData.map((month) => (
              <Link
                key={`${month.month}-${month.year}`}
                to={`/${month.year.toLowerCase()}/${month.month.toLowerCase()}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {month.articleCount} articles
                    </div>
                    <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {month.month} {month.year}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Featured:</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{month.featuredStory}</p>
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    View Articles
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Articles Yet</h3>
                <p className="text-gray-600">Articles will appear here as they are published.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;