
import { useSubscription } from '@/hooks/useSubscription';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function MobileUpgradeButton() {
  const {
    subscribed,
    loading
  } = useSubscription();

  if (loading || subscribed) return null;

  return (
    <Link to="/pricing">
      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
        <Crown className="w-4 h-4" />
        Upgrade para Premium
      </Button>
    </Link>
  );
}
