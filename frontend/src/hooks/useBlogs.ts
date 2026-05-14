import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import type { BlogsResponse } from '../types/blogs';

interface UseBlogsReturn {
  blogs: BlogsResponse | null;
  loading: boolean;
  error: string | null;
}

export const useBlogs = (): UseBlogsReturn => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<BlogsResponse>(`/api/blogs?lang=${language}`);
        setBlogs(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [language]);

  return { blogs, loading, error };
};