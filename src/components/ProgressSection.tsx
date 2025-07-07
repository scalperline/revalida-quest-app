
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';

export function ProgressSection() {
  const { userProgress } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();

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

  return (
    <div className="flex items-center gap-2">
      {/* Level Display */}
      <div className="flex items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{gamificationLevel}</span>
        </div>
        <span className="text-xs font-medium text-gray-700">Nível {gamificationLevel}</span>
      </div>

      {/* XP Progress */}
      <div className="flex items-center gap-1">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${Math.min(xpPercentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-gray-600">{userProgress.xp} XP</span>
      </div>

      {/* Subscription Plan Badge */}
      <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${planInfo.color} text-white text-xs font-medium`}>
        {planInfo.name}
      </div>
    </div>
  );
}
