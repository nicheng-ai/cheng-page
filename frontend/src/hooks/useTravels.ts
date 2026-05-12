import { useState, useEffect } from 'react';
import { api as apiClient } from '../api/client';
import type { TravelsResponse } from '../types/travels';

export const useTravels = () => {
  const [data, setData] = useState<TravelsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<TravelsResponse>('/api/travels')
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load travels'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
