
import { useState, useEffect } from 'react';

interface OnboardingData {
  weeklyGoal: number;
  focusAreas: string[];
}

interface OnboardingQuest {
  title: string;
  description: string;
  target: number;
  areas: string[];
  reward: {
    xp: number;
    badge?: string;
  };
}

export function useOnboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    const saved = localStorage.getItem('revalida-onboarding-completed');
    return saved === 'true';
  });

  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(() => {
    const saved = localStorage.getItem('revalida-onboarding-data');
    return saved ? JSON.parse(saved) : null;
  });

  const [onboardingQuest, setOnboardingQuest] = useState<OnboardingQuest | null>(() => {
    const saved = localStorage.getItem('revalida-onboarding-quest');
    return saved ? JSON.parse(saved) : null;
  });

  const generateOnboardingQuest = (data: OnboardingData): OnboardingQuest => {
    const questionsTarget = Math.min(data.weeklyGoal, 20); // Limitar a quest inicial
    const primaryArea = data.focusAreas[0] || 'Mista';
    
    return {
      title: `🎯 Quest de Boas-vindas: ${primaryArea}`,
      description: `Complete sua primeira missão focada em ${primaryArea}. Responda ${questionsTarget} questões com pelo menos 70% de acertos.`,
      target: questionsTarget,
      areas: data.focusAreas.slice(0, 3), // Máximo 3 áreas para não ficar muito específico
      reward: {
        xp: questionsTarget * 10,
        badge: 'Primeiro Passo'
      }
    };
  };

  const completeOnboarding = (data: OnboardingData) => {
    setOnboardingData(data);
    setHasCompletedOnboarding(true);
    
    // Gerar quest baseada na configuração
    const quest = generateOnboardingQuest(data);
    setOnboardingQuest(quest);
    
    // Salvar tudo no localStorage
    localStorage.setItem('revalida-onboarding-completed', 'true');
    localStorage.setItem('revalida-onboarding-data', JSON.stringify(data));
    localStorage.setItem('revalida-onboarding-quest', JSON.stringify(quest));
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    setOnboardingData(null);
    setOnboardingQuest(null);
    localStorage.removeItem('revalida-onboarding-completed');
    localStorage.removeItem('revalida-onboarding-data');
    localStorage.removeItem('revalida-onboarding-quest');
  };

  const skipOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('revalida-onboarding-completed', 'true');
  };

  const completeOnboardingQuest = () => {
    setOnboardingQuest(null);
    localStorage.removeItem('revalida-onboarding-quest');
  };

  return {
    hasCompletedOnboarding,
    onboardingData,
    onboardingQuest,
    completeOnboarding,
    resetOnboarding,
    skipOnboarding,
    completeOnboardingQuest,
    generateOnboardingQuest
  };
}
