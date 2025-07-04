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
  return;
}