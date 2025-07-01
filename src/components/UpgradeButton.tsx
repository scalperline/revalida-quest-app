
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
      className={`flex items-center gap-1 md:gap-1.5 lg:gap-2 h-8 md:h-9 lg:h-10 px-2 md:px-3 lg:px-4 text-xs md:text-sm ${
        subscribed 
          ? 'border-blue-200 text-blue-700 hover:bg-blue-50' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
      }`}
    >
      <Star className="w-3 h-3 md:w-4 md:h-4" />
      <span className="hidden md:inline">{buttonText}</span>
    </Button>
  );
}
