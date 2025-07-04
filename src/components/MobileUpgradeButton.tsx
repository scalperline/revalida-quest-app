
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

export function MobileUpgradeButton() {
  const navigate = useNavigate();
  const {
    subscribed,
    openCustomerPortal
  } = useSubscription();

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
      size="sm"
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Star className="w-3 h-3 mr-1" />
      {buttonText}
    </Button>
  );
}
