
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Sparkles, Users } from 'lucide-react';

export function SubscriptionBadge() {
  const { subscribed, subscription_tier, loading } = useSubscription();

  if (loading) {
    return (
      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!subscribed) {
    return (
      <Badge variant="outline" className="text-white border-blue-300 bg-transparent">
        <Zap className="w-3 h-3 mr-1" />
        Gratuito
      </Badge>
    );
  }

  const getBadgeConfig = () => {
    switch (subscription_tier) {
      case 'Basic':
        return {
          icon: Crown,
          color: 'bg-transparent text-white border-0',
          label: 'Basic'
        };
      case 'Premium':
        return {
          icon: Sparkles,
          color: 'bg-transparent text-white border-0',
          label: 'Premium'
        };
      case 'Pro':
        return {
          icon: Users,
          color: 'bg-transparent text-white border-0',
          label: 'Pro'
        };
      default:
        return {
          icon: Crown,
          color: 'bg-transparent text-white border-0',
          label: subscription_tier || 'Premium'
        };
    }
  };

  const { icon: Icon, color, label } = getBadgeConfig();

  return (
    <Badge className={color}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}
