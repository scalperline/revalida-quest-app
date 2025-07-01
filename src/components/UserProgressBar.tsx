
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/hooks/useAuth';
import { Zap } from 'lucide-react';

export function UserProgressBar() {
  const { user } = useAuth();
  const { userProgress } = useGamification();
  
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 text-white" />
          </div>
          <span className="text-xs font-semibold text-gray-800">
            Nv {userProgress.level}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600 font-medium">
            {userProgress.xp}/{userProgress.xpToNextLevel}
          </span>
          
          <div className="relative w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
