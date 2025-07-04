
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

export function SubscriptionBadge() {
  const { subscription } = useSubscription();
  
  if (!subscription) {
    return (
      <Badge variant="outline" className="text-xs">
        Gratuito
      </Badge>
    );
  }
  
  return (
    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs flex items-center gap-1">
      <Crown className="w-3 h-3" />
      Premium
    </Badge>
  );
}
