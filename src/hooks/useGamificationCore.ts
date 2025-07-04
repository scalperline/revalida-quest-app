import { useState, useCallback } from 'react';
import { Achievement } from '@/types/gamification';

// Core gamification logic separated from Supabase dependencies
export function useGamificationCore() {
  const [notifications, setNotifications] = useState<{
    levelUp: { show: boolean; newLevel: number };
    achievement: { show: boolean; achievement: Achievement | null };
    badge: { show: boolean; achievement: Achievement | null };
    missionCompleted: { show: boolean; mission: any | null };
  }>({
    levelUp: { show: false, newLevel: 0 },
    achievement: { show: false, achievement: null },
    badge: { show: false, achievement: null },
    missionCompleted: { show: false, mission: null }
  });

  const calculateXP = useCallback((isCorrect: boolean, area?: string) => {
    if (!isCorrect) return 0;
    
    // Base XP for correct answer
    let xp = 10;
    
    // Bonus XP based on area difficulty (example logic)
    const difficultyBonus: Record<string, number> = {
      'Cirurgia': 5,
      'Clínica Médica': 3,
      'Pediatria': 4,
      'Ginecologia': 4,
      'Psiquiatria': 3
    };
    
    if (area && difficultyBonus[area]) {
      xp += difficultyBonus[area];
    }
    
    return xp;
  }, []);

  const calculateLevel = useCallback((totalXP: number) => {
    // Level calculation: 100 XP for level 1, +50 XP for each subsequent level
    if (totalXP < 100) return 1;
    return Math.floor((totalXP - 100) / 50) + 2;
  }, []);

  const showLevelUpNotification = useCallback((newLevel: number) => {
    setNotifications(prev => ({
      ...prev,
      levelUp: { show: true, newLevel }
    }));
  }, []);

  const showAchievementNotification = useCallback((achievement: Achievement) => {
    setNotifications(prev => ({
      ...prev,
      achievement: { show: true, achievement }
    }));
  }, []);

  const showBadgeNotification = useCallback((achievement: Achievement) => {
    setNotifications(prev => ({
      ...prev,
      badge: { show: true, achievement }
    }));
  }, []);

  const showMissionCompletedNotification = useCallback((mission: any) => {
    setNotifications(prev => ({
      ...prev,
      missionCompleted: { show: true, mission }
    }));
  }, []);

  const closeNotifications = useCallback(() => {
    setNotifications({
      levelUp: { show: false, newLevel: 0 },
      achievement: { show: false, achievement: null },
      badge: { show: false, achievement: null },
      missionCompleted: { show: false, mission: null }
    });
  }, []);

  return {
    notifications,
    calculateXP,
    calculateLevel,
    showLevelUpNotification,
    showAchievementNotification,
    showBadgeNotification,
    showMissionCompletedNotification,
    closeNotifications
  };
}