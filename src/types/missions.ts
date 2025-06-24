
export interface Mission {
  id: string;
  title: string;
  description: string;
  objective: string;
  area: string;
  targetQuestions: number;
  targetAccuracy: number; // Porcentagem (ex: 70 para 70%)
  progress: number;
  completed: boolean;
  reward: {
    xp: number;
    badge?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // em minutos
}

export interface MissionProgress {
  missionId: string;
  questionsAnswered: number;
  correctAnswers: number;
  completed: boolean;
  completedAt?: Date;
}
