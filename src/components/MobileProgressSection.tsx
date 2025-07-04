import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
export function MobileProgressSection() {
  const {
    userProgress
  } = useGamification();
  const {
    subscribed,
    subscription_tier
  } = useSubscription();

  // Gamification level (separate from subscription plan)
  const gamificationLevel = userProgress.level;
  const xpPercentage = Math.round(userProgress.xp / userProgress.xpToNextLevel * 100);

  // Subscription plan info (separate from gamification)
  const getPlanInfo = () => {
    if (!subscribed) return {
      name: 'Gratuito',
      color: 'from-gray-400 to-gray-600'
    };
    switch (subscription_tier) {
      case 'Basic':
        return {
          name: 'Basic',
          color: 'from-blue-400 to-blue-600'
        };
      case 'Premium':
        return {
          name: 'Premium',
          color: 'from-purple-400 to-purple-600'
        };
      case 'Pro':
        return {
          name: 'Pro',
          color: 'from-gold-400 to-gold-600'
        };
      default:
        return {
          name: 'Premium',
          color: 'from-purple-400 to-purple-600'
        };
    }
  };
  const planInfo = getPlanInfo();
  return;
}