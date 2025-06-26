
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
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

  const buttonText = subscribed ? 'Gerenciar' : 'Premium';

  return (
    <Button
      onClick={handleUpgrade}
      className={`
        px-4 py-2 h-9
        bg-gradient-to-r from-orange-500 to-orange-600 
        hover:from-orange-600 hover:to-orange-700
        text-white font-medium text-sm
        rounded-lg
        shadow-md hover:shadow-lg
        transition-all duration-200
        border-none
      `}
    >
      <Star className="w-4 h-4 mr-1" />
      <span className="hidden sm:inline">{buttonText}</span>
      <span className="sm:hidden">Pro</span>
    </Button>
  );
}
