// Utility functions for statistics calculations
export function calculateAccuracyPercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getStreakDescription(streak: number): string {
  if (streak === 0) return 'Comece sua sequência!';
  if (streak === 1) return '1 dia consecutivo';
  return `${streak} dias consecutivos`;
}

export function getXPToNextLevel(currentXP: number, currentLevel: number): number {
  // Level calculation: 100 XP for level 1, +50 XP for each subsequent level
  const xpForCurrentLevel = currentLevel === 1 ? 0 : 100 + (currentLevel - 2) * 50;
  const xpForNextLevel = currentLevel === 1 ? 100 : 100 + (currentLevel - 1) * 50;
  
  return xpForNextLevel - currentXP;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}