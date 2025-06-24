
import { useState, useEffect } from 'react';

interface OnboardingData {
  weeklyGoal: number;
  focusAreas: string[];
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

  const completeOnboarding = (data: OnboardingData) => {
    setOnboardingData(data);
    setHasCompletedOnboarding(true);
    localStorage.setItem('revalida-onboarding-completed', 'true');
    localStorage.setItem('revalida-onboarding-data', JSON.stringify(data));
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    setOnboardingData(null);
    localStorage.removeItem('revalida-onboarding-completed');
    localStorage.removeItem('revalida-onboarding-data');
  };

  const skipOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('revalida-onboarding-completed', 'true');
  };

  return {
    hasCompletedOnboarding,
    onboardingData,
    completeOnboarding,
    resetOnboarding,
    skipOnboarding
  };
}
