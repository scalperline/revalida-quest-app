
import { useGamification } from '@/hooks/useGamification';
import { ProgressBar } from './ProgressBar';
import { Trophy, Target, Flame, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function GamifiedHeader() {
  const { userProgress, getAccuracy } = useGamification();
  const accuracy = getAccuracy();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6 rounded-2xl shadow-xl mb-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* User Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
              {userProgress.level}
            </div>
            <p className="text-sm mt-1 opacity-90">Nível</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-xl font-bold">{accuracy}%</span>
              </div>
              <p className="text-xs opacity-80">Precisão</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-xl font-bold">{userProgress.achievements.filter(a => a.unlocked).length}</span>
              </div>
              <p className="text-xs opacity-80">Troféus</p>
            </div>
            
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xl font-bold">{userProgress.streakDias}</span>
              </div>
              <p className="text-xs opacity-80">Sequência</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 max-w-md">
          <ProgressBar
            level={userProgress.level}
            xp={userProgress.xp}
            xpToNextLevel={userProgress.xpToNextLevel}
            className="bg-white/10 rounded-lg p-3"
          />
        </div>
      </div>
    </div>
  );
}
