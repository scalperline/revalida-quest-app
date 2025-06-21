
import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalQuestions: number;
  correctAnswers: number;
  simuladosCompletos: number;
  streakDias: number;
  achievements: Achievement[];
  newlyUnlockedAchievements: string[]; // Track newly unlocked achievements
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_question',
    title: 'Primeira Questão',
    description: 'Respondeu sua primeira questão',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'first_correct',
    title: 'Primeiro Acerto',
    description: 'Acertou sua primeira questão',
    icon: '✅',
    unlocked: false
  },
  {
    id: 'streak_7',
    title: 'Semana Consistente',
    description: 'Estudou por 7 dias consecutivos',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'questions_50',
    title: 'Meio Centenário',
    description: 'Respondeu 50 questões',
    icon: '💯',
    unlocked: false
  },
  {
    id: 'first_simulado',
    title: 'Primeiro Simulado',
    description: 'Completou seu primeiro simulado',
    icon: '📝',
    unlocked: false
  },
  {
    id: 'accuracy_80',
    title: 'Precisão Cirúrgica',
    description: 'Manteve 80% de acertos',
    icon: '🎪',
    unlocked: false
  }
];

export function useGamification() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('revalida-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert unlockedAt strings back to Date objects
        const achievements = parsed.achievements || [...ACHIEVEMENTS];
        achievements.forEach((achievement: Achievement) => {
          if (achievement.unlockedAt && typeof achievement.unlockedAt === 'string') {
            achievement.unlockedAt = new Date(achievement.unlockedAt);
          }
        });
        return {
          level: 1,
          xp: 0,
          xpToNextLevel: 100,
          totalQuestions: 0,
          correctAnswers: 0,
          simuladosCompletos: 0,
          streakDias: 0,
          newlyUnlockedAchievements: [],
          ...parsed,
          achievements
        };
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
    return {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalQuestions: 0,
      correctAnswers: 0,
      simuladosCompletos: 0,
      streakDias: 0,
      achievements: [...ACHIEVEMENTS],
      newlyUnlockedAchievements: []
    };
  });

  useEffect(() => {
    localStorage.setItem('revalida-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const addXP = (points: number) => {
    setUserProgress(prev => {
      let newXP = prev.xp + points;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNextLevel;

      // Level up logic
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100; // XP required increases with level
      }

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
        return prev; // Achievement already unlocked or doesn't exist
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

  const answerQuestion = (correct: boolean) => {
    setUserProgress(prev => {
      const newTotal = prev.totalQuestions + 1;
      const newCorrect = correct ? prev.correctAnswers + 1 : prev.correctAnswers;
      
      return {
        ...prev,
        totalQuestions: newTotal,
        correctAnswers: newCorrect
      };
    });

    // Check for achievements after state update
    setTimeout(() => {
      setUserProgress(prev => {
        const newTotal = prev.totalQuestions;
        const newCorrect = prev.correctAnswers;
        
        // Check achievements
        if (newTotal === 1) {
          const achievement = prev.achievements.find(a => a.id === 'first_question');
          if (achievement && !achievement.unlocked) {
            unlockAchievement('first_question');
          }
        }
        
        if (correct && newCorrect === 1) {
          const achievement = prev.achievements.find(a => a.id === 'first_correct');
          if (achievement && !achievement.unlocked) {
            unlockAchievement('first_correct');
          }
        }
        
        if (newTotal >= 50) {
          const achievement = prev.achievements.find(a => a.id === 'questions_50');
          if (achievement && !achievement.unlocked) {
            unlockAchievement('questions_50');
          }
        }
        
        if (newCorrect / newTotal >= 0.8 && newTotal >= 10) {
          const achievement = prev.achievements.find(a => a.id === 'accuracy_80');
          if (achievement && !achievement.unlocked) {
            unlockAchievement('accuracy_80');
          }
        }

        return prev;
      });
    }, 0);

    // Add XP based on performance
    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    setUserProgress(prev => {
      const newSimulados = prev.simuladosCompletos + 1;
      
      return {
        ...prev,
        simuladosCompletos: newSimulados
      };
    });

    // Check for simulado achievement
    setTimeout(() => {
      setUserProgress(prev => {
        if (prev.simuladosCompletos === 1) {
          const achievement = prev.achievements.find(a => a.id === 'first_simulado');
          if (achievement && !achievement.unlocked) {
            unlockAchievement('first_simulado');
          }
        }
        return prev;
      });
    }, 0);

    // Bonus XP for simulados
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

  return {
    userProgress,
    addXP,
    answerQuestion,
    completeSimulado,
    getAccuracy,
    getProgressPercentage,
    getNewlyUnlockedAchievement,
    clearNewlyUnlockedAchievement
  };
}
