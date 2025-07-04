
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

  // Pagination states
  const [allTimeCurrentPage, setAllTimeCurrentPage] = useState(1);
  const [weeklyCurrentPage, setWeeklyCurrentPage] = useState(1);
  const [allTimeTotalCount, setAllTimeTotalCount] = useState(0);
  const [weeklyTotalCount, setWeeklyTotalCount] = useState(0);
  
  const ITEMS_PER_PAGE = 10;

  const fetchPaginatedRanking = async (type: 'allTime' | 'weekly', page: number) => {
    try {
      const orderBy = type === 'allTime' ? 'total_xp' : 'weekly_xp';
      const offset = (page - 1) * ITEMS_PER_PAGE;

      // Get total count
      const { count } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Get paginated data
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order(orderBy, { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

      if (error) {
        console.error(`Error fetching ${type} ranking:`, error);
        return;
      }

      // Add position to data (based on global ranking position)
      const rankingWithPosition = data?.map((user, index) => ({
        ...user,
        position: offset + index + 1
      })) || [];

      if (type === 'allTime') {
        setAllTimeRanking(rankingWithPosition);
        setAllTimeTotalCount(count || 0);
      } else {
        setWeeklyRanking(rankingWithPosition);
        setWeeklyTotalCount(count || 0);
      }

    } catch (error) {
      console.error(`Error in fetch${type}Ranking:`, error);
    }
  };

  const fetchUserPosition = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's position in all-time ranking
      const { data: allTimeData } = await supabase
        .from('user_profiles')
        .select('user_id, total_xp')
        .order('total_xp', { ascending: false });

      // Get user's position in weekly ranking
      const { data: weeklyData } = await supabase
        .from('user_profiles')
        .select('user_id, weekly_xp')
        .order('weekly_xp', { ascending: false });

      const allTimePos = allTimeData?.findIndex(u => u.user_id === user.id) ?? -1;
      const weeklyPos = weeklyData?.findIndex(u => u.user_id === user.id) ?? -1;

      setCurrentUserPosition({
        allTime: allTimePos >= 0 ? allTimePos + 1 : 0,
        weekly: weeklyPos >= 0 ? weeklyPos + 1 : 0
      });
    } catch (error) {
      console.error('Error fetching user position:', error);
    }
  };

  const fetchRankings = async () => {
    setLoading(true);
    await Promise.all([
      fetchPaginatedRanking('allTime', allTimeCurrentPage),
      fetchPaginatedRanking('weekly', weeklyCurrentPage),
      fetchUserPosition()
    ]);
    setLoading(false);
  };

  // Update rankings when page changes
  useEffect(() => {
    fetchPaginatedRanking('allTime', allTimeCurrentPage);
  }, [allTimeCurrentPage]);

  useEffect(() => {
    fetchPaginatedRanking('weekly', weeklyCurrentPage);
  }, [weeklyCurrentPage]);

  // Initial load
  useEffect(() => {
    fetchRankings();
  }, []);

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

  const getTotalPages = (type: 'allTime' | 'weekly') => {
    const totalCount = type === 'allTime' ? allTimeTotalCount : weeklyTotalCount;
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
  };

  return {
    allTimeRanking,
    weeklyRanking,
    currentUserPosition,
    loading,
    refreshRankings: fetchRankings,
    updateUserProfile,
    // Pagination
    allTimeCurrentPage,
    weeklyCurrentPage,
    setAllTimeCurrentPage,
    setWeeklyCurrentPage,
    allTimeTotalPages: getTotalPages('allTime'),
    weeklyTotalPages: getTotalPages('weekly'),
    allTimeTotalCount,
    weeklyTotalCount
  };
}
