import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import type { Research } from '../types/research';

interface UseResearchReturn {
  research: Research | null;
  loading: boolean;
  error: string | null;
}

export const useResearch = (): UseResearchReturn => {
  const { language } = useLanguage();
  const [research, setResearch] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Research>(`/api/research?lang=${language}`);
        setResearch(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load research');
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, [language]);

  return { research, loading, error };
};
