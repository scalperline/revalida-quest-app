
import { useGamificationState } from './useGamificationState';
import { useGamificationAchievements } from './useGamificationAchievements';
import { useGamificationActions } from './useGamificationActions';

// Re-export types for backward compatibility
export type { Achievement, Quest, MedicalCard, UserProgress } from '@/types/gamification';

export function useGamification() {
  const { userProgress, setUserProgress } = useGamificationState();
  
  const {
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  } = useGamificationAchievements(userProgress, setUserProgress);

  const {
    resetStats,
    answerQuestion: baseAnswerQuestion,
    completeSimulado: baseCompleteSimulado,
    getAccuracy,
    getProgressPercentage,
    getStreakBonus,
    generateQuestSuggestions
  } = useGamificationActions(userProgress, setUserProgress, checkAchievements);

  const answerQuestion = (correct: boolean, area?: string) => {
    baseAnswerQuestion(correct, area);
  };

  const completeSimulado = (score: number, total: number) => {
    baseCompleteSimulado(score, total);
    
    if (score === total) {
      unlockAchievement('sniper_gabarito');
    }
  };

  const addXP = (points: number) => {
    setUserProgress(prev => {
      const { newXP, newLevel, newXPToNext } = require('@/utils/gamificationHelpers').calculateLevelUp(prev.xp, prev.level, points);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext
      };
    });
  };

  return {
    userProgress,
    addXP,
    answerQuestion,
    completeSimulado,
    getAccuracy,
    getProgressPercentage,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement,
    getStreakBonus,
    generateQuestSuggestions,
    resetStats,
    unlockAchievement
  };
}
