
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

export function UpgradeButton() {
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

  const buttonText = subscribed ? 'Gerenciar' : 'Premium';

  return (
    <Button
      onClick={handleUpgrade}
      variant={subscribed ? "outline" : "default"}
      size="sm"
      className={subscribed ? 
        "text-blue-600 border-blue-200 hover:bg-blue-50" : 
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      }
    >
      {!subscribed && <Star className="w-4 h-4 mr-2" />}
      {buttonText}
    </Button>
  );
}
