
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';

export function ProgressSection() {
  const { userProgress } = useGamification();
  const { subscribed, subscription_tier } = useSubscription();

  const getPlanInfo = () => {
    if (!subscribed) return { level: 1, name: 'Gratuito' };
    switch (subscription_tier) {
      case 'Basic':
        return { level: 2, name: 'Basic' };
      case 'Premium':
        return { level: 3, name: 'Premium' };
      case 'Pro':
        return { level: 4, name: 'Pro' };
      default:
        return { level: 2, name: 'Premium' };
    }
  };

  const planInfo = getPlanInfo();
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  return (
    <Button
      variant="ghost"
      className="
        h-10 px-3 
        bg-gradient-to-r from-blue-50 to-purple-50 
        hover:from-blue-100 hover:to-purple-100
        border border-blue-200/50 
        rounded-xl
        transition-all duration-300
        shadow-sm hover:shadow-md
        group
      "
    >
      <div className="flex items-center gap-2">
        {/* Ícone e Nível */}
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Nível {planInfo.level}
          </span>
        </div>

        {/* Separador */}
        <div className="w-px h-4 bg-gray-300"></div>

        {/* XP Info */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">
            {userProgress.xp}/{userProgress.xpToNextLevel} XP
          </span>
          
          {/* Barra de Progresso Compacta */}
          <div className="relative w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-700"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Button>
  );
}
