
import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category?: 'area' | 'streak' | 'performance' | 'general';
  area?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  area: string;
  target: number;
  progress: number;
  reward: {
    xp: number;
    badge?: string;
    card?: string;
  };
  completed: boolean;
  type: 'area' | 'streak' | 'performance';
}

export interface MedicalCard {
  id: string;
  title: string;
  area: string;
  content: string;
  tip: string;
  unlocked: boolean;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalQuestions: number;
  correctAnswers: number;
  simuladosCompletos: number;
  streakDias: number;
  lastActivityDate?: Date;
  achievements: Achievement[];
  quests: Quest[];
  medicalCards: MedicalCard[];
  newlyUnlockedAchievements: string[];
  areaStats: Record<string, { correct: number; total: number }>;
}

const ACHIEVEMENTS: Achievement[] = [
  // Conquistas Gerais
  {
    id: 'first_question',
    title: 'Primeira Questão',
    description: 'Respondeu sua primeira questão',
    icon: '🎯',
    unlocked: false,
    category: 'general'
  },
  {
    id: 'first_correct',
    title: 'Primeiro Acerto',
    description: 'Acertou sua primeira questão',
    icon: '✅',
    unlocked: false,
    category: 'general'
  },
  
  // Conquistas de Streak
  {
    id: 'streak_3',
    title: 'Consistência Bronze',
    description: 'Estudou por 3 dias consecutivos',
    icon: '🥉',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'streak_7',
    title: 'Semana Consistente',
    description: 'Estudou por 7 dias consecutivos',
    icon: '🔥',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'streak_30',
    title: 'Mestre da Consistência',
    description: 'Estudou por 30 dias consecutivos',
    icon: '👑',
    unlocked: false,
    category: 'streak'
  },
  
  // Conquistas por Área
  {
    id: 'clinica_master',
    title: '🧠 Mente Clínica',
    description: '90% de acerto em Clínica Médica',
    icon: '🧠',
    unlocked: false,
    category: 'area',
    area: 'Clínica Médica'
  },
  {
    id: 'pediatria_expert',
    title: '👶 Pediatra Expert',
    description: '85% de acerto em Pediatria',
    icon: '👶',
    unlocked: false,
    category: 'area',
    area: 'Pediatria'
  },
  {
    id: 'gineco_master',
    title: '🌸 Gineco Master',
    description: '85% de acerto em Ginecologia',
    icon: '🌸',
    unlocked: false,
    category: 'area',
    area: 'Ginecologia e Obstetrícia'
  },
  
  // Conquistas de Performance
  {
    id: 'sniper_gabarito',
    title: '🎯 Sniper do Gabarito',
    description: '100% de acerto em um simulado',
    icon: '🎯',
    unlocked: false,
    category: 'performance'
  },
  {
    id: 'desbravador',
    title: '🧭 Desbravador Revalida',
    description: 'Respondeu questões de todos os anos (2011-2025)',
    icon: '🧭',
    unlocked: false,
    category: 'performance'
  },
  {
    id: 'questions_100',
    title: 'Centenário',
    description: 'Respondeu 100 questões',
    icon: '💯',
    unlocked: false,
    category: 'performance'
  }
];

const MEDICAL_CARDS: MedicalCard[] = [
  {
    id: 'card_clinica_1',
    title: 'Diagnóstico Diferencial',
    area: 'Clínica Médica',
    content: 'O diagnóstico diferencial é fundamental na prática médica...',
    tip: 'Sempre considere as hipóteses mais prováveis primeiro!',
    unlocked: false,
    rarity: 'comum'
  },
  {
    id: 'card_pediatria_1',
    title: 'Marcos do Desenvolvimento',
    area: 'Pediatria',
    content: 'Os marcos do desenvolvimento infantil são cruciais...',
    tip: 'Memorize os marcos por faixa etária!',
    unlocked: false,
    rarity: 'raro'
  }
];

export function useGamification() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('revalida-progress');
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
          medicalCards: [...MEDICAL_CARDS],
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
      medicalCards: [...MEDICAL_CARDS],
      areaStats: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('revalida-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateStreak = () => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    setUserProgress(prev => {
      const lastActivity = prev.lastActivityDate;
      const lastActivityStr = lastActivity?.toDateString();
      
      if (lastActivityStr === todayStr) {
        return prev; // Já estudou hoje
      }
      
      let newStreak = 1;
      if (lastActivity) {
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streakDias + 1;
        }
      }
      
      // Calcular XP de streak
      let streakXP = 10; // Base XP
      if (newStreak >= 3) streakXP = 20;
      if (newStreak >= 7) streakXP = 50;
      if (newStreak >= 30) streakXP = 100;
      
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

  const checkAreaAchievements = () => {
    setUserProgress(prev => {
      const newAchievements = [...prev.achievements];
      let hasChanges = false;
      
      Object.entries(prev.areaStats).forEach(([area, stats]) => {
        if (stats.total >= 10) { // Mínimo de questões para validar
          const accuracy = (stats.correct / stats.total) * 100;
          
          // Verificar conquistas por área
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
                
                if (!prev.newlyUnlockedAchievements.includes(achievement.id)) {
                  prev.newlyUnlockedAchievements.push(achievement.id);
                }
              }
            }
          });
        }
      });
      
      return hasChanges ? { ...prev, achievements: newAchievements } : prev;
    });
  };

  const generateQuestSuggestions = (): Quest[] => {
    const suggestions: Quest[] = [];
    
    // Analisar áreas com baixo desempenho
    Object.entries(userProgress.areaStats).forEach(([area, stats]) => {
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
    
    return suggestions.slice(0, 3); // Máximo 3 sugestões
  };

  const addXP = (points: number) => {
    setUserProgress(prev => {
      let newXP = prev.xp + points;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNextLevel;

      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
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
    // Atualizar streak primeiro
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

    // Atualizar estatísticas por área
    if (area) {
      updateAreaStats(area, correct);
    }

    // Verificar conquistas
    setTimeout(() => {
      setUserProgress(prev => {
        // Conquistas básicas
        if (prev.totalQuestions === 1) unlockAchievement('first_question');
        if (correct && prev.correctAnswers === 1) unlockAchievement('first_correct');
        if (prev.totalQuestions >= 100) unlockAchievement('questions_100');
        
        // Conquistas de streak
        if (prev.streakDias === 3) unlockAchievement('streak_3');
        if (prev.streakDias === 7) unlockAchievement('streak_7');
        if (prev.streakDias === 30) unlockAchievement('streak_30');
        
        checkAreaAchievements();
        return prev;
      });
    }, 100);

    // Adicionar XP
    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    setUserProgress(prev => ({
      ...prev,
      simuladosCompletos: prev.simuladosCompletos + 1
    }));

    // Verificar conquista de 100%
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
    if (userProgress.streakDias >= 30) return 100;
    if (userProgress.streakDias >= 7) return 50;
    if (userProgress.streakDias >= 3) return 20;
    return 10;
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
    generateQuestSuggestions
  };
}
