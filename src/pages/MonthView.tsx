import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const MonthView: React.FC = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const { articles, loading: isLoading, error } = useArticles();
  
  const capitalizeMonth = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const monthName = month ? capitalizeMonth(month) : '';
  const yearNum = year ? year.charAt(0).toUpperCase() + year.slice(1) : '';

  const monthArticles = articles.filter(
    article => 
      article.month.toLowerCase() === month?.toLowerCase() && 
      article.year === yearNum
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/archive" className="hover:text-blue-600 transition-colors">{yearNum}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{monthName}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{monthName} {yearNum}</h1>
              <p className="text-gray-600">{monthArticles.length} articles published</p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {monthArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readingTime}
                    </div>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <Link
                  to={`/${article.year.toLowerCase()}/${article.month.toLowerCase()}/${article.id}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {monthArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              There are no articles available for {monthName} {yearNum}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthView;