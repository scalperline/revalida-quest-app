import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
export function ProgressSection() {
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
  return <Button variant="ghost" className="h-10 sm:px-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md group min-w-0 flex-shrink-0 text-left mx-0 my-0 py-0 px-[30px]">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        {/* Ícone e Nível de Gamificação */}
        <div className="flex items-center gap-1 flex-shrink-0 px-0 my-0 py-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-gray-800">
            Nv {gamificationLevel}
          </span>
        </div>

        {/* Separador - oculto em telas muito pequenas */}
        <div className="hidden xs:block w-px h-3 sm:h-4 bg-gray-300"></div>

        {/* XP Info */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
            {userProgress.xp}/{userProgress.xpToNextLevel}
          </span>
          
          {/* Barra de Progresso XP */}
          <div className="relative w-8 sm:w-12 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 group-hover:from-orange-500 group-hover:to-orange-700" style={{
            width: `${xpPercentage}%`
          }} />
          </div>
        </div>

        {/* Separador - oculto em telas muito pequenas */}
        <div className="hidden sm:block w-px h-3 sm:h-4 bg-gray-300"></div>

        {/* Plano de Assinatura */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${planInfo.color}`}></div>
          <span className="text-xs font-medium text-gray-600">
            {planInfo.name}
          </span>
        </div>
      </div>
    </Button>;
}