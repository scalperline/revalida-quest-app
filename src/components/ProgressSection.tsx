
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';

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
    <div className="flex items-center gap-3">
      {/* Texto de Progresso Compacto */}
      <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
        <Zap className="w-4 h-4 text-orange-500" />
        <span className="font-medium">
          Nível {planInfo.level} • {userProgress.xp}/{userProgress.xpToNextLevel} XP
        </span>
      </div>

      {/* Versão Mobile - Apenas ícone e nível */}
      <div className="md:hidden flex items-center gap-1 text-sm text-gray-600">
        <Zap className="w-4 h-4 text-orange-500" />
        <span className="font-medium">Lv. {planInfo.level}</span>
      </div>

      {/* Barra de Progresso Compacta */}
      <div className="relative w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500"
          style={{ width: `${xpPercentage}%` }}
        />
      </div>
    </div>
  );
}
