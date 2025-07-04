export interface MedicalLevel {
  id: number;
  name: string;
  icon: string;
  minXP: number;
  maxXP: number;
}

export const MEDICAL_LEVELS: MedicalLevel[] = [
  { id: 1, name: 'Estudante', icon: '📚', minXP: 0, maxXP: 100 },
  { id: 2, name: 'Interno', icon: '👨‍⚕️', minXP: 100, maxXP: 250 },
  { id: 3, name: 'Residente', icon: '🩺', minXP: 250, maxXP: 500 },
  { id: 4, name: 'Clínico', icon: '👩‍⚕️', minXP: 500, maxXP: 900 },
  { id: 5, name: 'Especialista', icon: '🔬', minXP: 900, maxXP: 1500 },
  { id: 6, name: 'Mestre', icon: '🏆', minXP: 1500, maxXP: Infinity }
];

export function getCurrentLevel(xp: number): MedicalLevel {
  for (let i = MEDICAL_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= MEDICAL_LEVELS[i].minXP) {
      return MEDICAL_LEVELS[i];
    }
  }
  return MEDICAL_LEVELS[0];
}

export function getNextLevel(currentLevel: MedicalLevel): MedicalLevel | null {
  const currentIndex = MEDICAL_LEVELS.findIndex(level => level.id === currentLevel.id);
  return currentIndex < MEDICAL_LEVELS.length - 1 ? MEDICAL_LEVELS[currentIndex + 1] : null;
}

export function getProgressToNextLevel(xp: number): { 
  current: number; 
  total: number; 
  percentage: number 
} {
  const currentLevel = getCurrentLevel(xp);
  const nextLevel = getNextLevel(currentLevel);
  
  if (!nextLevel) {
    return { current: 0, total: 100, percentage: 100 };
  }
  
  const current = xp - currentLevel.minXP;
  const total = nextLevel.minXP - currentLevel.minXP;
  const percentage = Math.round((current / total) * 100);
  
  return { current, total, percentage };
}

export function checkLevelUp(oldXP: number, newXP: number): MedicalLevel | null {
  const oldLevel = getCurrentLevel(oldXP);
  const newLevel = getCurrentLevel(newXP);
  
  return newLevel.id > oldLevel.id ? newLevel : null;
}