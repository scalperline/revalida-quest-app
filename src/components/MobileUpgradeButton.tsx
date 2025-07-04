
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
      <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 px-0 py-0 rounded-none">
        <Crown className="w-4 h-4" />
        Upgrade para Premium
      </Button>
    </Link>
  );
}
