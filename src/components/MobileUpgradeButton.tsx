
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

export function MobileUpgradeButton() {
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
      className={`flex items-center gap-1 h-6 px-2 text-xs ${
        subscribed 
          ? 'border-blue-200 text-blue-700 hover:bg-blue-50' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
      }`}
    >
      <Star className="w-2.5 h-2.5" />
      <span className="text-xs">{buttonText}</span>
    </Button>
  );
}
