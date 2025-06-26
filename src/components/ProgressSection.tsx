
import { Progress } from '@/components/ui/progress';
import { Zap, Star } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';

export function ProgressSection() {
  const { userProgress } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();

  const getPlanInfo = () => {
    if (!subscribed) return { level: 1, name: 'Gratuito', color: 'from-gray-400 to-gray-600' };
    switch (subscription_tier) {
      case 'Basic':
        return { level: 2, name: 'Basic', color: 'from-blue-500 to-blue-600' };
      case 'Premium':
        return { level: 3, name: 'Premium', color: 'from-purple-500 to-purple-600' };
      case 'Pro':
        return { level: 4, name: 'Pro', color: 'from-orange-500 to-orange-600' };
      default:
        return { level: 2, name: 'Premium', color: 'from-purple-500 to-purple-600' };
    }
  };

  const planInfo = getPlanInfo();
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  const xpRemaining = userProgress.xpToNextLevel - userProgress.xp;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 min-w-[280px] max-w-[320px]">
      {/* Header com nível e badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 bg-gradient-to-r ${planInfo.color} rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200`}>
            <Zap className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">Nível {planInfo.level}</div>
            <div className="text-xs text-gray-600">{planInfo.name}</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-orange-500 inline mr-1" />
          <span className="text-xs font-semibold text-orange-700">{xpPercentage}%</span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-600">
            {userProgress.xp} / {userProgress.xpToNextLevel} XP
          </span>
          <span className="text-xs text-orange-600 font-semibold">
            +{xpRemaining} XP
          </span>
        </div>
        
        <div className="relative">
          <Progress 
            value={xpPercentage} 
            className="h-3 bg-gray-100 rounded-full overflow-hidden"
          />
          <div 
            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
        
        {xpRemaining > 0 && (
          <div className="text-center">
            <span className="text-xs text-gray-500">
              Faltam <span className="font-semibold text-orange-600">{xpRemaining} XP</span> para o próximo nível! 
              <span className="ml-1">🚀</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
