import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import type { Profile } from '../types/profile';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

export const useProfile = (): UseProfileReturn => {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Profile>(`/api/profile?lang=${language}`);
        setProfile(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [language]);

  return { profile, loading, error };
};
