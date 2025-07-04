import { getCurrentLevel, getProgressToNextLevel } from '@/utils/levelUtils';

interface CircularXPProgressProps {
  xp: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularXPProgress({ 
  xp, 
  size = 80, 
  strokeWidth = 6,
  className = '' 
}: CircularXPProgressProps) {
  const currentLevel = getCurrentLevel(xp);
  const progress = getProgressToNextLevel(xp);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress.percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Circular Progress Bar */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.4))'
            }}
          />
        </svg>
        
        {/* XP Display in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-bold text-foreground">
              {xp}
            </div>
            <div className="text-2xs text-muted-foreground">
              XP
            </div>
          </div>
        </div>
      </div>
      
      {/* Level Display */}
      <div className="mt-1 text-center">
        <div className="text-2xs text-muted-foreground flex items-center gap-1">
          <span>{currentLevel.icon}</span>
          <span>Nível {currentLevel.id}</span>
        </div>
      </div>
    </div>
  );
}