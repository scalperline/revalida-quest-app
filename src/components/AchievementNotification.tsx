
import { useState, useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { Achievement } from '@/hooks/useGamification';
import { ConfettiAnimation } from './ConfettiAnimation';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onClose();
          setShowConfetti(false);
        }, 500);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <>
      <ConfettiAnimation trigger={showConfetti} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 text-center transform transition-all duration-500 ${
          visible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
        }`}>
          <div className="mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
              <Trophy className="w-8 h-8 text-yellow-200" />
            </div>
            
            <div className="text-4xl mb-2 animate-pulse">
              {achievement.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-1">
              Conquista Desbloqueada! 🎉
            </h3>
            
            <h4 className="text-lg font-semibold mb-2 text-yellow-200">
              {achievement.title}
            </h4>
            
            <p className="text-sm opacity-90">
              {achievement.description}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-white/20 rounded-lg p-2">
            <Zap className="w-4 h-4 text-yellow-200" />
            <span className="font-semibold text-sm">Nova conquista!</span>
          </div>
        </div>
      </div>
    </>
  );
}
