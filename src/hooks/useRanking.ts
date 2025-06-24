
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserRankingData {
  id: string;
  user_id: string;
  display_name: string;
  level: number;
  total_xp: number;
  weekly_xp: number;
  position: number;
}

export function useRanking() {
  const [allTimeRanking, setAllTimeRanking] = useState<UserRankingData[]>([]);
  const [weeklyRanking, setWeeklyRanking] = useState<UserRankingData[]>([]);
  const [currentUserPosition, setCurrentUserPosition] = useState<{ allTime: number; weekly: number }>({ allTime: 0, weekly: 0 });
  const [loading, setLoading] = useState(true);

  const fetchRankings = async () => {
    try {
      setLoading(true);

      // Fetch all-time ranking
      const { data: allTimeData, error: allTimeError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('total_xp', { ascending: false })
        .limit(100);

      if (allTimeError) {
        console.error('Error fetching all-time ranking:', allTimeError);
        return;
      }

      // Fetch weekly ranking
      const { data: weeklyData, error: weeklyError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('weekly_xp', { ascending: false })
        .limit(100);

      if (weeklyError) {
        console.error('Error fetching weekly ranking:', weeklyError);
        return;
      }

      // Add position to data
      const allTimeWithPosition = allTimeData?.map((user, index) => ({
        ...user,
        position: index + 1
      })) || [];

      const weeklyWithPosition = weeklyData?.map((user, index) => ({
        ...user,
        position: index + 1
      })) || [];

      setAllTimeRanking(allTimeWithPosition);
      setWeeklyRanking(weeklyWithPosition);

      // Get current user data to find their position
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const allTimePos = allTimeWithPosition.findIndex(u => u.user_id === user.id);
        const weeklyPos = weeklyWithPosition.findIndex(u => u.user_id === user.id);
        
        setCurrentUserPosition({
          allTime: allTimePos >= 0 ? allTimePos + 1 : 0,
          weekly: weeklyPos >= 0 ? weeklyPos + 1 : 0
        });
      }
    } catch (error) {
      console.error('Error in fetchRankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userData: { display_name: string; level: number; total_xp: number; weekly_xp: number }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          display_name: userData.display_name,
          level: userData.level,
          total_xp: userData.total_xp,
          weekly_xp: userData.weekly_xp,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating user profile:', error);
      } else {
        // Refresh rankings after update
        fetchRankings();
      }
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return {
    allTimeRanking,
    weeklyRanking,
    currentUserPosition,
    loading,
    refreshRankings: fetchRankings,
    updateUserProfile
  };
}
