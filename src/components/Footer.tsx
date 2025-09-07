import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-3 group mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Daily Brief</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive current affairs analysis for competitive exam preparation. 
              Stay informed with daily updates on national and international developments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/archive" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Archive</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-600">Policy & Governance</span></li>
              <li><span className="text-sm text-gray-600">International Affairs</span></li>
              <li><span className="text-sm text-gray-600">Economics & Finance</span></li>
              <li><span className="text-sm text-gray-600">Science & Technology</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Daily Brief. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-2 md:mt-0">
              Daily current affairs for competitive exams
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;