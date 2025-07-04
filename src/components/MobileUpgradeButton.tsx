
import { useSubscription } from '@/hooks/useSubscription';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function MobileUpgradeButton() {
  const { subscribed, loading } = useSubscription();

  if (loading || subscribed) return null;

  return (
    <Link to="/pricing">
      <Button 
        size="sm" 
        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-xs px-3 py-1.5"
      >
        <Crown className="w-3 h-3 mr-1" />
        Upgrade
      </Button>
    </Link>
  );
}
