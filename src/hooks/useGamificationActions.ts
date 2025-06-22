
import { UserProgress } from '@/types/gamification';
import { 
  calculateLevelUp, 
  calculateStreakXP, 
  generateQuestSuggestions
} from '@/utils/gamificationHelpers';

export function useGamificationActions(
  userProgress: UserProgress,
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>,
  checkAchievements: (correct: boolean, area?: string) => void
) {
  const resetStats = () => {
    setUserProgress(prev => ({
      ...prev,
      totalQuestions: 0,
      correctAnswers: 0,
      simuladosCompletos: 0,
      areaStats: {},
    }));
  };

  const updateStreak = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    setUserProgress(prev => {
      const lastActivity = prev.lastActivityDate;
      const lastActivityStr = lastActivity?.toDateString();
      
      if (lastActivityStr === todayStr) {
        return prev;
      }
      
      let newStreak = 1;
      if (lastActivity) {
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streakDias + 1;
        }
      }
      
      const streakXP = calculateStreakXP(newStreak);
      console.log(`Streak updated: ${newStreak} days, +${streakXP} XP`);
      
      return {
        ...prev,
        streakDias: newStreak,
        lastActivityDate: today,
        xp: prev.xp + streakXP
      };
    });
  };

  const updateAreaStats = (area: string, correct: boolean) => {
    setUserProgress(prev => {
      const areaStats = { ...prev.areaStats };
      if (!areaStats[area]) {
        areaStats[area] = { correct: 0, total: 0 };
      }
      
      areaStats[area].total += 1;
      if (correct) {
        areaStats[area].correct += 1;
      }
      
      return { ...prev, areaStats };
    });
  };

  const addXP = (points: number) => {
    setUserProgress(prev => {
      const { newXP, newLevel, newXPToNext } = calculateLevelUp(prev.xp, prev.level, points);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext
      };
    });
  };

  const answerQuestion = (correct: boolean, area?: string) => {
    updateStreak();
    
    setUserProgress(prev => {
      const newTotal = prev.totalQuestions + 1;
      const newCorrect = correct ? prev.correctAnswers + 1 : prev.correctAnswers;
      
      return {
        ...prev,
        totalQuestions: newTotal,
        correctAnswers: newCorrect
      };
    });

    if (area) {
      updateAreaStats(area, correct);
    }

    checkAchievements(correct, area);
    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    setUserProgress(prev => ({
      ...prev,
      simuladosCompletos: prev.simuladosCompletos + 1
    }));

    if (score === total) {
      // This would need to be passed from the achievements hook
      // For now, we'll handle this in the main hook
    }

    const percentage = score / total;
    const bonusXP = Math.floor(percentage * 50) + 25;
    addXP(bonusXP);
  };

  const getAccuracy = () => {
    if (userProgress.totalQuestions === 0) return 0;
    return Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100);
  };

  const getProgressPercentage = () => {
    return Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  };

  const getStreakBonus = () => {
    return calculateStreakXP(userProgress.streakDias);
  };

  return {
    resetStats,
    answerQuestion,
    completeSimulado,
    getAccuracy,
    getProgressPercentage,
    getStreakBonus,
    generateQuestSuggestions: () => generateQuestSuggestions(userProgress.areaStats)
  };
}
