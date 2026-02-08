import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import type { NewsResponse } from '../types/news';

interface UseNewsReturn {
  news: NewsResponse | null;
  loading: boolean;
  error: string | null;
}

export const useNews = (): UseNewsReturn => {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<NewsResponse>(`/api/news?lang=${language}`);
        setNews(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  return { news, loading, error };
};
