import { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { PublicationsResponse } from '../types/publications';

export const usePublications = () => {
  const [data, setData] = useState<PublicationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<PublicationsResponse>('/api/publications')
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load publications'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
