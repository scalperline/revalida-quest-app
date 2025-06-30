
import { Progress } from '@/components/ui/progress';
import { Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPProgressBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  compact?: boolean;
  className?: string;
}

export function XPProgressBar({ 
  currentXP, 
  nextLevelXP, 
  level, 
  compact = false, 
  className 
}: XPProgressBarProps) {
  const percentage = Math.round((currentXP / nextLevelXP) * 100);
  const nextLevel = level + 1;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-500" />
          <span className={cn(
            "font-medium text-gray-700",
            compact ? "text-sm" : "text-base"
          )}>
            Experiência
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <span className={cn("font-bold", compact ? "text-sm" : "text-base")}>
            {currentXP}
          </span>
          <span className={cn("text-gray-400", compact ? "text-xs" : "text-sm")}>
            / {nextLevelXP}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(
            "bg-gray-200 border border-gray-300",
            compact ? "h-2" : "h-3"
          )}
        />
        {/* XP Bar Custom Styling */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Sparkle Effect */}
        {percentage > 0 && (
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 animate-pulse"
            style={{ left: `${Math.max(percentage - 2, 0)}%` }}
          >
            <Zap className="w-3 h-3 text-yellow-300" />
          </div>
        )}
      </div>

      {/* Next Level Info */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-gray-500 font-medium",
          compact ? "text-xs" : "text-sm"
        )}>
          Nível Atual: {level}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500" />
          <span className={cn(
            "text-gray-500 font-medium",
            compact ? "text-xs" : "text-sm"
          )}>
            Próximo: {nextLevel}
          </span>
        </div>
      </div>

      {/* Progress Text */}
      {!compact && (
        <div className="text-center">
          <span className="text-xs text-gray-500">
            {nextLevelXP - currentXP} XP para o próximo nível
          </span>
        </div>
      )}
    </div>
  );
}
