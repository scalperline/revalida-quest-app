import { useGamification } from '@/hooks/useGamification';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';
export function MobileProgressSection() {
  const {
    userProgress,
    getAccuracy
  } = useGamification();
  const progressPercentage = userProgress.xpToNextLevel > 0 ? (userProgress.xpToNextLevel - (userProgress.xpToNextLevel - userProgress.xp)) / userProgress.xpToNextLevel * 100 : 0;
  const accuracy = getAccuracy();
  return;
}