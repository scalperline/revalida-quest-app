
export interface ChallengeQuestion {
  id: number; // Changed from string to number to match Question type
  enunciado: string;
  options: { text: string }[];
  correct: string;
  area: string;
  year: number;
  image?: string;
}

export interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<string, string>;
  questions: ChallengeQuestion[];
  hasCompleted: boolean;
  hasWon: boolean;
  streak: number;
  combo: number;
  timeBonus: number;
  coinsEarned: number;
  perfectAnswers: number;
  timeLeft: number;
}

export interface ChallengeStats {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  coinsEarned: number;
  perfectStreak: boolean;
}
