
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

  return (
    <div className="space-y-2">
      {/* Gamification Level */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Nível {gamificationLevel}
          </span>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">
            XP: {userProgress.xp}/{userProgress.xpToNextLevel}
          </span>
          <span className="text-xs text-gray-500">
            {xpPercentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" 
            style={{ width: `${xpPercentage}%` }} 
          />
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${planInfo.color}`}></div>
        <span className="text-xs font-medium text-gray-600">
          Plano {planInfo.name}
        </span>
      </div>
    </div>
  );
}
