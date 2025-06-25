
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap } from 'lucide-react';

export function SubscriptionBadge() {
  const { subscribed, subscription_tier, loading } = useSubscription();

  if (loading) {
    return (
      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!subscribed) {
    return (
      <Badge variant="outline" className="text-gray-600 border-gray-300">
        <Zap className="w-3 h-3 mr-1" />
        Gratuito
      </Badge>
    );
  }

  return (
    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
      <Crown className="w-3 h-3 mr-1" />
      {subscription_tier || 'Premium'}
    </Badge>
  );
}
