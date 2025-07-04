
import { Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function MobileProgressIndicator() {
  const { userProgress } = useGamification();
  
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-lg">
      {/* Level Icon */}
      <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
        <Zap className="w-2 h-2 text-white" />
      </div>
      
      {/* Level Number */}
      <span className="text-xs font-semibold text-gray-800">
        {userProgress.level}
      </span>
      
      {/* Progress Bar */}
      <div className="relative w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500" 
          style={{ width: `${xpPercentage}%` }} 
        />
      </div>
      
      {/* XP Text */}
      <span className="text-xs font-medium text-gray-600">
        {userProgress.xp}
      </span>
    </div>
  );
}
