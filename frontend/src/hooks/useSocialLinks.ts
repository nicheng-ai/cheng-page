import { useState, useEffect } from 'react';
import { api } from '../api/client';
import type { SocialLinksResponse } from '../types/social';

interface UseSocialLinksReturn {
  socialLinks: SocialLinksResponse | null;
  loading: boolean;
  error: string | null;
}

export const useSocialLinks = (): UseSocialLinksReturn => {
  const [socialLinks, setSocialLinks] = useState<SocialLinksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<SocialLinksResponse>('/api/social-links');
        setSocialLinks(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load social links');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  return { socialLinks, loading, error };
};
