import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, Zap, Smartphone, Calendar, Users } from 'lucide-react';
import { MonthData, Article } from '../types';
import NewsletterSignup from '../components/NewsletterSignup';

const Home: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch monthly data
        const monthlyResponse = await fetch('/api/monthly-data');
        if (!monthlyResponse.ok) {
          throw new Error('Failed to fetch monthly data');
        }
        const monthlyResult = await monthlyResponse.json();
        setMonthlyData(monthlyResult);

        // Fetch latest article for the "Read Today's Analysis" link
        const articlesResponse = await fetch('/api/articles');
        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles');
        }
        const articlesResult = await articlesResponse.json();
        if (articlesResult.length > 0) {
          // Sort by date and get the most recent
          const sortedArticles = articlesResult.sort((a: Article, b: Article) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          setLatestArticle(sortedArticles[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Today's World:
              <span className="text-blue-600 block">5-Minute Brief</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Essential news analysis for students and young professionals. 
              Stay informed without the overwhelm.
            </p>
            {latestArticle ? (
              <Link
                to={`/${latestArticle.year.toLowerCase()}/${latestArticle.month.toLowerCase()}/${latestArticle.id}`}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Read Today's Analysis
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

      {/* Monthly Archive Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Month</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive deep into monthly archives of curated news analysis and educational content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <p className="text-sm font-medium text-gray-700 mb-1">Featured Story:</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{month.featuredStory}</p>
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Explore Month
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Articles Yet</h3>
                <p className="text-gray-600">Articles will appear here as they are published.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Daily Brief?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed specifically for students and young professionals who need to stay informed efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data-Driven Analysis</h3>
              <p className="text-gray-600">
                Every story backed by credible sources, statistics, and expert insights.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational Focus</h3>
              <p className="text-gray-600">
                Complex topics explained clearly with context you need to understand.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Minute Reads</h3>
              <p className="text-gray-600">
                Concise, focused content that fits into your busy student schedule.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Smartphone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
              <p className="text-gray-600">
                Perfect reading experience on any device, anywhere you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Community Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Connect with 10,000+ students and young professionals who stay informed with Daily Brief.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Countries Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;