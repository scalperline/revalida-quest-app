import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Flame, Star, Zap, Award } from 'lucide-react';
export function GamifiedMissionsDashboard() {
  const {
    userProgress
  } = useGamification();
  const stats = [{
    label: 'Nível Atual',
    value: userProgress.level,
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50 border-yellow-200'
  }, {
    label: 'XP Total',
    value: userProgress.xp,
    icon: Zap,
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  }, {
    label: 'Sequência',
    value: `${userProgress.streakDias} dias`,
    icon: Flame,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 border-orange-200'
  }, {
    label: 'Conquistas',
    value: userProgress.achievements?.filter(a => a.unlocked).length || 0,
    icon: Trophy,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  }];
  const xpPercentage = Math.round(userProgress.xp / userProgress.xpToNextLevel * 100);
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
      const IconComponent = stat.icon;
      return;
    })}
    </div>;
}