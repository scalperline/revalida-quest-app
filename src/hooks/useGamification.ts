
import { useGamificationSupabase } from './useGamificationSupabase';
import { useGamificationState } from './useGamificationState';
import { useGamificationAchievements } from './useGamificationAchievements';
import { useGamificationActions } from './useGamificationActions';
import { useAuth } from './useAuth';
import { useSubscription } from './useSubscription';

// Re-export types for backward compatibility
export type { Achievement, Quest, MedicalCard, UserProgress } from '@/types/gamification';

export function useGamification() {
  const { user } = useAuth();
  const { updateUsage } = useSubscription();
  
  // Use Supabase integration if user is logged in, otherwise use local state
  const supabaseGamification = useGamificationSupabase();
  const { userProgress: localProgress, setUserProgress } = useGamificationState();
  
  const {
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  } = useGamificationAchievements(
    user ? supabaseGamification.userProgress : localProgress, 
    setUserProgress
  );

  const {
    resetStats: localResetStats,
    answerQuestion: baseAnswerQuestion,
    completeSimulado: baseCompleteSimulado,
    getAccuracy: localGetAccuracy,
    getProgressPercentage: localGetProgressPercentage,
    getStreakBonus,
    generateQuestSuggestions
  } = useGamificationActions(
    user ? supabaseGamification.userProgress : localProgress, 
    setUserProgress, 
    checkAchievements
  );

  // Use Supabase methods if user is logged in
  const userProgress = user ? supabaseGamification.userProgress : localProgress;
  const loading = user ? supabaseGamification.loading : false;
  
  const answerQuestion = async (correct: boolean, area?: string, questionId?: number) => {
    console.log('🎯 Respondendo questão:', { correct, area, questionId, user: !!user });
    
    if (user) {
      // Update gamification first
      await supabaseGamification.answerQuestion(correct, area, questionId);
      
      // Then update usage limits
      console.log('📊 Atualizando limites de uso...');
    } else {
      baseAnswerQuestion(correct, area);
    }
  };

  const completeSimulado = async (score: number, total: number) => {
    console.log('🏆 Completando simulado:', { score, total, user: !!user });
    
    if (user) {
      // Update gamification first
      supabaseGamification.completeSimulado(score, total);
      
      // Then update usage limits
      await updateUsage('simulados');
    } else {
      baseCompleteSimulado(score, total);
    }
    
    if (score === total) {
      unlockAchievement('sniper_gabarito');
    }
  };

  const addXP = (points: number) => {
    console.log('⚡ Adicionando XP:', points, 'para usuário:', user?.id);
    
    if (user) {
      supabaseGamification.addXP(points);
    } else {
      setUserProgress(prev => {
        const { newXP, newLevel, newXPToNext } = require('@/utils/gamificationHelpers').calculateLevelUp(prev.xp, prev.level, points);

        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          xpToNextLevel: newXPToNext
        };
      });
    }
  };

  const resetStats = () => {
    if (user) {
      supabaseGamification.resetStats();
    } else {
      localResetStats();
    }
  };

  const getAccuracy = () => {
    if (user) {
      return supabaseGamification.getAccuracy();
    } else {
      return localGetAccuracy();
    }
  };

  const getProgressPercentage = () => {
    if (user) {
      return supabaseGamification.getProgressPercentage();
    } else {
      return localGetProgressPercentage();
    }
  };

  // Get the newly unlocked badge for badge notification
  const getNewlyUnlockedBadge = () => {
    return getNewlyUnlockedAchievement();
  };

  const clearNewlyUnlockedBadge = () => {
    clearNewlyUnlockedAchievement();
  };

  return {
    userProgress,
    loading,
    addXP,
    answerQuestion,
    completeSimulado,
    getAccuracy,
    getProgressPercentage,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement,
    getNewlyUnlockedBadge,
    clearNewlyUnlockedBadge,
    getStreakBonus,
    generateQuestSuggestions,
    resetStats,
    unlockAchievement
  };
}
