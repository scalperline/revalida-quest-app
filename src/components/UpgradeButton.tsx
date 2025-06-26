
import { Button } from '@/components/ui/button';
import { Crown, Star, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

export function UpgradeButton() {
  const navigate = useNavigate();
  const { subscribed, openCustomerPortal } = useSubscription();

  const handleUpgrade = () => {
    if (subscribed) {
      openCustomerPortal();
    } else {
      navigate('/pricing');
    }
  };

  const getButtonContent = () => {
    if (subscribed) {
      return {
        text: 'Gerenciar',
        icon: Sparkles,
        gradient: 'from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800'
      };
    }
    return {
      text: 'Premium',
      icon: Star,
      gradient: 'from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800'
    };
  };

  const buttonInfo = getButtonContent();
  const Icon = buttonInfo.icon;

  return (
    <Button
      onClick={handleUpgrade}
      className={`
        bg-gradient-to-r ${buttonInfo.gradient}
        text-white font-semibold
        px-6 py-3 h-12
        rounded-2xl
        shadow-lg hover:shadow-xl
        transform hover:scale-105 hover:-translate-y-0.5
        transition-all duration-300
        border-2 border-white/20
        relative
        overflow-hidden
        group
      `}
    >
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
      
      <div className="relative flex items-center gap-2">
        <Icon className="w-5 h-5 drop-shadow-md" />
        <span className="text-sm font-bold tracking-wide drop-shadow-md">
          {buttonInfo.text}
        </span>
      </div>
    </Button>
  );
}
