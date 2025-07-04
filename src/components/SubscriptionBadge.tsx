import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Sparkles, Users } from 'lucide-react';
export function SubscriptionBadge() {
  const {
    subscribed,
    subscription_tier,
    loading
  } = useSubscription();
  if (loading) {
    return <div className="h-4 w-16 bg-gray-300/30 rounded-full animate-pulse"></div>;
  }
  if (!subscribed) {
    return <span className="font-semibold text-sm drop-shadow-lg text-gray-800">
        Gratuito
      </span>;
  }
  const getBadgeLabel = () => {
    switch (subscription_tier) {
      case 'Basic':
        return 'Basic';
      case 'Premium':
        return 'Premium';
      case 'Pro':
        return 'Pro';
      default:
        return subscription_tier || 'Premium';
    }
  };
  return <span className="text-white font-semibold text-sm drop-shadow-lg">
      {getBadgeLabel()}
    </span>;
}