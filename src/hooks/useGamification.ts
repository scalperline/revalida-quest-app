
import { useState, useEffect } from 'react';
import { UserProgress } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';
import { MEDICAL_CARDS } from '@/data/medicalCards';
import { 
  initializeUserProgress, 
  calculateLevelUp, 
  calculateStreakXP, 
  generateQuestSuggestions,
  checkAreaAchievements
} from '@/utils/gamificationHelpers';

// Re-export types for backward compatibility
export type { Achievement, Quest, MedicalCard, UserProgress } from '@/types/gamification';

export function useGamification() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('revalida-progress');
    return initializeUserProgress(saved);
  });

  useEffect(() => {
    localStorage.setItem('revalida-progress', JSON.stringify(userProgress));
  }, [userProgress]);

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

  const unlockAchievement = (achievementId: string) => {
    setUserProgress(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) {
        return prev;
      }

      const updatedAchievements = prev.achievements.map(a => 
        a.id === achievementId 
          ? { ...a, unlocked: true, unlockedAt: new Date() }
          : a
      );

      console.log('Achievement unlocked:', achievementId);

      return {
        ...prev,
        achievements: updatedAchievements,
        newlyUnlockedAchievements: [...prev.newlyUnlockedAchievements, achievementId]
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

    setTimeout(() => {
      setUserProgress(prev => {
        if (prev.totalQuestions === 1) unlockAchievement('first_question');
        if (correct && prev.correctAnswers === 1) unlockAchievement('first_correct');
        if (prev.totalQuestions >= 100) unlockAchievement('questions_100');
        
        if (prev.streakDias === 3) unlockAchievement('streak_3');
        if (prev.streakDias === 7) unlockAchievement('streak_7');
        if (prev.streakDias === 30) unlockAchievement('streak_30');
        
        const { achievements, newlyUnlocked } = checkAreaAchievements(
          prev.achievements, 
          prev.areaStats, 
          prev.newlyUnlockedAchievements
        );
        
        return { ...prev, achievements, newlyUnlockedAchievements: newlyUnlocked };
      });
    }, 100);

    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    setUserProgress(prev => ({
      ...prev,
      simuladosCompletos: prev.simuladosCompletos + 1
    }));

    if (score === total) {
      unlockAchievement('sniper_gabarito');
    }

    const percentage = score / total;
    const bonusXP = Math.floor(percentage * 50) + 25;
    addXP(bonusXP);
  };

  const getNewlyUnlockedAchievement = () => {
    if (userProgress.newlyUnlockedAchievements.length === 0) return null;
    
    const achievementId = userProgress.newlyUnlockedAchievements[0];
    const achievement = userProgress.achievements.find(a => a.id === achievementId);
    
    return achievement || null;
  };

  const clearNewlyUnlockedAchievement = () => {
    setUserProgress(prev => ({
      ...prev,
      newlyUnlockedAchievements: prev.newlyUnlockedAchievements.slice(1)
    }));
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
    userProgress,
    addXP,
    answerQuestion,
    completeSimulado,
    getAccuracy,
    getProgressPercentage,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement,
    getStreakBonus,
    generateQuestSuggestions: () => generateQuestSuggestions(userProgress.areaStats),
    resetStats
  };
}
