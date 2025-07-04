
import { Achievement, UserProgress, Quest } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';

export const initializeUserProgress = (saved?: string): UserProgress => {
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
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
        quests: [],
        medicalCards: [],
        areaStats: {},
        ...parsed,
        achievements,
        lastActivityDate: parsed.lastActivityDate ? new Date(parsed.lastActivityDate) : undefined
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
    newlyUnlockedAchievements: [],
    quests: [],
    medicalCards: [],
    areaStats: {}
  };
};

export const calculateLevelUp = (currentXP: number, currentLevel: number, points: number) => {
  let newXP = currentXP + points;
  let newLevel = currentLevel;
  let newXPToNext = newLevel * 100;

  while (newXP >= newXPToNext) {
    newXP -= newXPToNext;
    newLevel++;
    newXPToNext = newLevel * 100;
  }

  return { newXP, newLevel, newXPToNext };
};

// Initialize with demo values (XP=250, Level=3)
export const initializeDemoProgress = (): UserProgress => {
  return {
    level: 3,
    xp: 250,
    xpToNextLevel: 250, // 500 - 250 = 250 XP to next level
    totalQuestions: 25,
    correctAnswers: 20,
    simuladosCompletos: 2,
    streakDias: 5,
    achievements: [...ACHIEVEMENTS],
    newlyUnlockedAchievements: [],
    quests: [],
    medicalCards: [],
    areaStats: {
      'Clínica Médica': { correct: 8, total: 10 },
      'Cirurgia': { correct: 6, total: 8 },
      'Pediatria': { correct: 6, total: 7 }
    }
  };
};

export const calculateStreakXP = (streakDays: number): number => {
  if (streakDays >= 30) return 100;
  if (streakDays >= 7) return 50;
  if (streakDays >= 3) return 20;
  return 10;
};

export const generateQuestSuggestions = (areaStats: Record<string, { correct: number; total: number }>): Quest[] => {
  const suggestions: Quest[] = [];
  
  Object.entries(areaStats).forEach(([area, stats]) => {
    if (stats.total >= 5) {
      const accuracy = (stats.correct / stats.total) * 100;
      if (accuracy < 70) {
        suggestions.push({
          id: `improve_${area}`,
          title: `Missão de Recuperação: ${area}`,
          description: `Melhore seu desempenho em ${area} - responda 10 questões com 75% de acerto`,
          area,
          target: 10,
          progress: 0,
          reward: { xp: 100, badge: `Especialista ${area}` },
          completed: false,
          type: 'area'
        });
      }
    }
  });
  
  return suggestions.slice(0, 3);
};

export const checkAreaAchievements = (
  achievements: Achievement[], 
  areaStats: Record<string, { correct: number; total: number }>,
  newlyUnlocked: string[]
): { achievements: Achievement[]; newlyUnlocked: string[] } => {
  const newAchievements = [...achievements];
  const updatedNewlyUnlocked = [...newlyUnlocked];
  let hasChanges = false;
  
  Object.entries(areaStats).forEach(([area, stats]) => {
    if (stats.total >= 10) {
      const accuracy = (stats.correct / stats.total) * 100;
      
      const areaAchievements = ACHIEVEMENTS.filter(a => a.area === area);
      areaAchievements.forEach(achievement => {
        const existing = newAchievements.find(a => a.id === achievement.id);
        if (existing && !existing.unlocked) {
          let shouldUnlock = false;
          
          if (achievement.id === 'clinica_master' && accuracy >= 90) shouldUnlock = true;
          if (achievement.id === 'pediatria_expert' && accuracy >= 85) shouldUnlock = true;
          if (achievement.id === 'gineco_master' && accuracy >= 85) shouldUnlock = true;
          
          if (shouldUnlock) {
            existing.unlocked = true;
            existing.unlockedAt = new Date();
            hasChanges = true;
            
            if (!updatedNewlyUnlocked.includes(achievement.id)) {
              updatedNewlyUnlocked.push(achievement.id);
            }
          }
        }
      });
    }
  });
  
  return { achievements: newAchievements, newlyUnlocked: updatedNewlyUnlocked };
};
