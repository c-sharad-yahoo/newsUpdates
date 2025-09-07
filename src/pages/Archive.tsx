import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { useMonthlyData } from '../hooks/useArticles';

const Archive: React.FC = () => {
  const { monthlyData, loading: isLoading, error } = useMonthlyData();

  const years = [...new Set(monthlyData.map(item => item.year))].sort((a, b) => b.localeCompare(a));
  
  const groupedData = years.map(year => ({
    year,
    months: monthlyData.filter(item => item.year === year)
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading archive...</p>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Archive</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of news analysis and educational content, 
            organized by month and year for easy discovery.
          </p>
        </div>

        {/* Archive Grid */}
        {groupedData.length > 0 ? groupedData.map(({ year, months }) => (
          <div key={year} className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {months.reduce((sum, month) => sum + month.articleCount, 0)} articles
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {months.map((month) => (
                <Link
                  key={`${month.month}-${month.year}`}
                  to={`/${month.year.toLowerCase()}/${month.month.toLowerCase()}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Month Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {month.articleCount} articles
                      </div>
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {month.month} {month.year}
                    </h3>
                    
                    {/* Featured Story */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">Featured Story:</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {month.featuredStory}
                      </p>
                    </div>
                    
                    {/* View Button */}
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      Explore Month
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-gray-600">The archive will be populated as articles are published.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for Something Specific?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Use our search feature or browse by category 
            to discover relevant articles across all our archives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Search Articles
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;