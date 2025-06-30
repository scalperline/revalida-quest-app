
import { Trophy, TrendingUp, TrendingDown, Medal, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface RankingIndicatorProps {
  position: number;
  loading?: boolean;
  compact?: boolean;
  className?: string;
}

export function RankingIndicator({ 
  position, 
  loading = false, 
  compact = false, 
  className 
}: RankingIndicatorProps) {
  const getRankingInfo = (pos: number) => {
    if (pos === 0) return { 
      text: "Não ranqueado", 
      icon: Trophy, 
      color: "text-gray-500",
      badgeColor: "bg-gray-500"
    };
    
    if (pos <= 3) return { 
      text: `#${pos}º Nacional`, 
      icon: Crown, 
      color: "text-yellow-600",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-amber-600"
    };
    
    if (pos <= 10) return { 
      text: `#${pos}º Nacional`, 
      icon: Medal, 
      color: "text-orange-600",
      badgeColor: "bg-gradient-to-r from-orange-500 to-red-500"
    };
    
    if (pos <= 100) return { 
      text: `#${pos}º Nacional`, 
      icon: Trophy, 
      color: "text-blue-600",
      badgeColor: "bg-gradient-to-r from-blue-500 to-purple-500"
    };
    
    return { 
      text: `#${pos}º Nacional`, 
      icon: Trophy, 
      color: "text-gray-600",
      badgeColor: "bg-gradient-to-r from-gray-500 to-gray-600"
    };
  };

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className={cn("h-4", compact ? "w-20" : "w-32")} />
      </div>
    );
  }

  const rankInfo = getRankingInfo(position);
  const Icon = rankInfo.icon;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full p-1.5 flex items-center justify-center",
        compact ? "w-8 h-8" : "w-10 h-10"
      )}>
        <Icon className={cn(
          rankInfo.color,
          compact ? "w-4 h-4" : "w-5 h-5"
        )} />
      </div>
      
      <div className={cn(compact && "space-y-0")}>
        <Badge 
          className={cn(
            "text-white font-bold shadow-lg",
            rankInfo.badgeColor,
            compact ? "text-xs px-2 py-1" : "text-sm px-3 py-1"
          )}
        >
          {rankInfo.text}
        </Badge>
        
        {!compact && position > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            Ranking Nacional
          </p>
        )}
      </div>
    </div>
  );
}
