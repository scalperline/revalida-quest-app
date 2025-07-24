
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

  const buttonText = subscribed ? 'Gerenciar' : 'Upgrade';

  return (
    <Button
      onClick={handleUpgrade}
      variant={subscribed ? "outline" : "default"}
      size="sm"
      className={`flex items-center gap-0.5 md:gap-1 lg:gap-1.5 h-7 md:h-8 lg:h-9 px-1.5 md:px-2 lg:px-3 text-xs ${
        subscribed 
          ? 'border-blue-200 text-blue-700 hover:bg-blue-50' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
      }`}
    >
      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4" />
      <span className="hidden sm:inline text-xs">{buttonText}</span>
    </Button>
  );
}
