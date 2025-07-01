
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export function useAvatar() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAvatar();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAvatar = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('avatar_url')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading avatar:', error);
      } else {
        setAvatarUrl(profile?.avatar_url || null);
      }
    } catch (error) {
      console.error('Error loading avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = (url: string) => {
    setAvatarUrl(url);
  };

  return {
    avatarUrl,
    loading,
    updateAvatar,
    refreshAvatar: loadAvatar
  };
}
