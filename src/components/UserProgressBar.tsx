
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';

export function UserProgressBar() {
  const { userProgress } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();
  const { isMobile, isTablet } = useResponsive();

  // Gamification level (separate from subscription plan)
  const gamificationLevel = userProgress.level;
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  // Subscription plan info (separate from gamification)
  const getPlanInfo = () => {
    if (!subscribed) return { name: 'Gratuito', color: 'from-gray-400 to-gray-600' };
    
    switch (subscription_tier) {
      case 'Basic':
        return { name: 'Basic', color: 'from-blue-400 to-blue-600' };
      case 'Premium':
        return { name: 'Premium', color: 'from-purple-400 to-purple-600' };
      case 'Pro':
        return { name: 'Pro', color: 'from-gold-400 to-gold-600' };
      default:
        return { name: 'Premium', color: 'from-purple-400 to-purple-600' };
    }
  };

  const planInfo = getPlanInfo();

  // Compact version for mobile
  if (isMobile) {
    return (
      <Button 
        variant="ghost" 
        className="h-7 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-md transition-all duration-300 shadow-sm hover:shadow-md group min-w-0 flex-shrink-0 text-left px-2 py-0.5 text-gray-500"
      >
        <div className="flex items-center gap-1 min-w-0">
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Zap className="w-1.5 h-1.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-800">
              {gamificationLevel}
            </span>
          </div>
          <div className="relative w-4 h-1 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" 
              style={{ width: `${xpPercentage}%` }} 
            />
          </div>
        </div>
      </Button>
    );
  }

  // Medium version for tablet
  if (isTablet) {
    return (
      <Button 
        variant="ghost" 
        className="h-8 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md group min-w-0 flex-shrink-0 text-left px-3 py-0.5 text-gray-500"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Zap className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Nv {gamificationLevel}
            </span>
          </div>
          
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs font-medium text-gray-600">
              {userProgress.xp}/{userProgress.xpToNextLevel}XP
            </span>
            <div className="relative w-6 h-1.5 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" 
                style={{ width: `${xpPercentage}%` }} 
              />
            </div>
          </div>
        </div>
      </Button>
    );
  }

  // Full version for desktop
  return (
    <Button 
      variant="ghost" 
      className="h-9 lg:h-10 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md group min-w-0 flex-shrink-0 text-left px-4 py-0.5 text-gray-500"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Nv {gamificationLevel}
          </span>
        </div>

        <div className="w-px h-3 bg-gray-300"></div>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-gray-600">
            {userProgress.xp}/{userProgress.xpToNextLevel} XP
          </span>
          
          <div className="relative w-8 h-1.5 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-700" 
              style={{ width: `${xpPercentage}%` }} 
            />
          </div>
        </div>

        <div className="w-px h-3 bg-gray-300"></div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${planInfo.color}`}></div>
          <span className="text-sm font-medium text-gray-600">
            {planInfo.name}
          </span>
        </div>
      </div>
    </Button>
  );
}
