import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MonthView from './pages/MonthView';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Archive from './pages/Archive';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/:year/:month" element={<MonthView />} />
              <Route path="/:year/:month/:id" element={<ArticleDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;