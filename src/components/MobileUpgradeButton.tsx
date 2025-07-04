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
  return;
}