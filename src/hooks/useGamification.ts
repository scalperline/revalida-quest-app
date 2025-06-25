
import { useGamificationSupabase } from './useGamificationSupabase';
import { useGamificationAchievements } from './useGamificationAchievements';
import { useGamificationActions } from './useGamificationActions';

// Re-export types for backward compatibility
export type { Achievement, Quest, MedicalCard, UserProgress } from '@/types/gamification';

export function useGamification() {
  const { userProgress, updateProgress, saveQuestionAnswer, getUserAnswer, loading } = useGamificationSupabase();
  
  const {
    unlockAchievement,
    checkAchievements,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  } = useGamificationAchievements(userProgress, updateProgress);

  const {
    resetStats,
    answerQuestion: baseAnswerQuestion,
    completeSimulado: baseCompleteSimulado,
    getAccuracy,
    getProgressPercentage,
    getStreakBonus,
    generateQuestSuggestions
  } = useGamificationActions(userProgress, updateProgress, checkAchievements);

  const answerQuestion = async (correct: boolean, area?: string, questionId?: number, userAnswer?: string) => {
    baseAnswerQuestion(correct, area);
    
    // Salvar resposta no Supabase se fornecidos os parâmetros
    if (questionId !== undefined && userAnswer !== undefined) {
      await saveQuestionAnswer(questionId, userAnswer, correct);
    }
  };

  const completeSimulado = (score: number, total: number) => {
    baseCompleteSimulado(score, total);
    
    if (score === total) {
      unlockAchievement('sniper_gabarito');
    }
  };

  const addXP = (points: number) => {
    const newXPToNext = userProgress.level * 100;
    let newXP = userProgress.xp + points;
    let newLevel = userProgress.level;

    while (newXP >= newXPToNext) {
      newXP -= newXPToNext;
      newLevel++;
    }

    const updatedProgress = {
      ...userProgress,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: newLevel * 100
    };

    updateProgress(updatedProgress);
  };

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
    unlockAchievement,
    getUserAnswer
  };
}
