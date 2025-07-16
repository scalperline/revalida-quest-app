// Constantes do ranking
export const AREAS = [
  { value: '', label: 'Todas as Áreas' },
  { value: 'Clínica', label: 'Clínica' },
  { value: 'Cirurgia', label: 'Cirurgia' },
  { value: 'Pediatria', label: 'Pediatria' },
  { value: 'Ginecologia', label: 'Ginecologia' },
  { value: 'Preventiva', label: 'Preventiva' },
];

export const NIVEIS = [
  { value: 'all', label: 'Todos os Níveis' },
  { value: 'beginner', label: 'Intermediário' },
  { value: 'advanced', label: 'Avançado' },
  { value: 'especialista', label: 'Especialista' },
];

// Utilitários do ranking
export const RankingUtils = {
  getLevelTitle: (level: number): string => {
    if (level >= 20) return 'Especialista';
    if (level >= 15) return 'Avançado';
    if (level >= 10) return 'Intermediário';
    return 'Iniciante';
  },

  getPodiumColor: (pos: number): string => {
    if (pos === 1) return 'bg-yellow-400 border-yellow-400';
    if (pos === 2) return 'bg-gray-300 border-gray-300';
    if (pos === 3) return 'bg-orange-400 border-orange-400';
    return 'bg-blue-200 border-blue-200';
  },

  simulateMovement: (idx: number) => {
    if (idx % 3 === 0) return { type: 'up', value: 1 };
    if (idx % 3 === 1) return { type: 'down', value: 1 };
    return { type: 'same', value: 0 };
  },

  getAvatarBorder: (user: any, isTop3: boolean): string => {
    if (isTop3) {
      if (user.position === 1) return 'from-yellow-400 to-yellow-600';
      if (user.position === 2) return 'from-gray-400 to-gray-600';
      if (user.position === 3) return 'from-orange-400 to-orange-600';
    }
    return 'from-blue-400 to-purple-500';
  },

  getAvatarBorderStyle: (user: any, isTop3: boolean): string => {
    if (isTop3) {
      if (user.position === 1) return 'linear-gradient(135deg, #e7c873 60%, #bfa14a 100%)';
      if (user.position === 2) return 'linear-gradient(135deg, #d1d5db 60%, #a3a3a3 100%)';
      if (user.position === 3) return 'linear-gradient(135deg, #f59e42 60%, #b45309 100%)';
    }
    return 'linear-gradient(135deg, #e5e7eb 60%, #9ca3af 100%)';
  },

  getAccuracy: (user: any): number => {
    if (!user.total_questions || user.total_questions === 0) return 0;
    return Math.round((user.correct_answers / user.total_questions) * 100);
  },

  getXpPercent: (user: any): number => {
    if (!user.xpToNextLevel || !user.total_xp) return 0;
    const xpAtual = user.total_xp - (user.xpBaseLevel || 0);
    return Math.min(100, Math.round((xpAtual / user.xpToNextLevel) * 100));
  },

  generateMotivationalMessage: (user: any, allTimeRanking: any[]): string => {
    if (!user || !user.position || user.position <= 10) return '';
    
    const tenth = allTimeRanking[9];
    if (tenth) {
      const diff = tenth.total_xp - user.total_xp;
      if (diff > 0 && diff <= 50) {
        return `Você está a apenas ${diff} XP de entrar no top 10! Continue assim! 🚀`;
      }
    }
    return '';
  }
};

// Tipos para melhor organização
export interface UserRankingItem {
  id: string;
  user_id: string;
  display_name: string;
  level: number;
  total_xp: number;
  weekly_xp: number;
  position: number;
  avatar_url?: string;
  total_questions?: number;
  correct_answers?: number;
}

export interface MovementData {
  type: 'up' | 'down' | 'same';
  value: number;
}

export interface PodiumData {
  position: 1 | 2 | 3;
  name: string;
  avatarUrl?: string;
  level: string;
  score: number;
  accuracy: number;
} 