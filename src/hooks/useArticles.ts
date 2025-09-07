import { useState, useEffect } from 'react';
import { Article } from '../types';

export function useArticles(isPremium: boolean = false) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        setError(null);
        
        // Try API first (production and development with server)
        const response = await fetch(`/api/articles?isPremium=${isPremium}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          throw new Error('API not available');
        }
      } catch (err) {
        console.log('API not available, using fallback articles');
        setError('Unable to load articles from server');
        
        // Fallback to static articles (development without server)
        try {
          const { articles: staticArticles } = await import('../data/articles');
          setArticles(staticArticles);
        } catch (importError) {
          console.error('Failed to load fallback articles:', importError);
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [isPremium]);

  const refetch = () => {
    loadArticles();
  };

  return { articles, loading, error, refetch };
}

export function useMonthlyData() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMonthlyData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/monthly-data');
        if (response.ok) {
          const data = await response.json();
          setMonthlyData(data);
        } else {
          throw new Error('API not available');
        }
      } catch (err) {
        console.log('Monthly data API not available');
        setError('Unable to load monthly data from server');
        
        // Fallback to static monthly data
        try {
          const { monthlyData: staticMonthlyData } = await import('../data/articles');
          setMonthlyData(staticMonthlyData);
        } catch (importError) {
          console.error('Failed to load fallback monthly data:', importError);
          setMonthlyData([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMonthlyData();
  }, []);

  return { monthlyData, loading, error };
}