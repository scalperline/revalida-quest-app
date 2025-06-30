
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MedicalAvatarProps {
  level: number;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MedicalAvatar({ level, tier, size = 'md', className }: MedicalAvatarProps) {
  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return {
          border: 'from-cyan-300 via-blue-400 to-purple-500',
          bg: 'from-cyan-100 to-blue-200',
          glow: 'shadow-cyan-500/30'
        };
      case 'gold':
        return {
          border: 'from-yellow-300 via-amber-400 to-orange-500',
          bg: 'from-yellow-100 to-amber-200',
          glow: 'shadow-yellow-500/30'
        };
      case 'silver':
        return {
          border: 'from-gray-300 via-slate-400 to-gray-500',
          bg: 'from-gray-100 to-slate-200',
          glow: 'shadow-gray-500/30'
        };
      default: // bronze
        return {
          border: 'from-orange-300 via-amber-600 to-orange-700',
          bg: 'from-orange-100 to-amber-200',
          glow: 'shadow-orange-500/30'
        };
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-10 h-10'
  };

  const badgeSizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2 py-1'
  };

  const colors = getTierColors(tier);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Glowing Border */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-gradient-to-r p-1 animate-pulse",
        colors.border,
        colors.glow,
        sizeClasses[size]
      )}>
        <div className="w-full h-full rounded-full bg-white" />
      </div>

      {/* Avatar */}
      <Avatar className={cn(sizeClasses[size], "relative z-10 border-2 border-white")}>
        <AvatarImage src="" alt="Medical Avatar" />
        <AvatarFallback className={cn("bg-gradient-to-br", colors.bg)}>
          <Stethoscope className={cn("text-gray-700", iconSizes[size])} />
        </AvatarFallback>
      </Avatar>

      {/* Level Badge */}
      <Badge 
        variant="default"
        className={cn(
          "absolute -bottom-1 -right-1 z-20 font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg",
          badgeSizes[size]
        )}
      >
        {level}
      </Badge>
    </div>
  );
}
