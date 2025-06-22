
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
