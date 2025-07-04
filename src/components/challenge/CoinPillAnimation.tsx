
import { useState, useEffect } from 'react';
import { Coins, Sparkles, Flame, Star } from 'lucide-react';

interface CoinPillAnimationProps {
  coins: number;
  combo: number;
  streak: number;
  isVisible: boolean;
  position: { x: number; y: number };
  onAnimationComplete?: () => void;
}

export function CoinPillAnimation({ 
  coins, 
  combo, 
  streak, 
  isVisible, 
  position,
  onAnimationComplete 
}: CoinPillAnimationProps) {
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    if (isVisible && coins > 0) {
      setShowPill(true);
      
      const timer = setTimeout(() => {
        setShowPill(false);
        onAnimationComplete?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, coins, onAnimationComplete]);

  if (!showPill) return null;

  const getPillStyle = () => {
    if (combo >= 5) return 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse shadow-2xl scale-110';
    if (combo >= 3) return 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-xl scale-105';
    return 'bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 shadow-lg';
  };

  const getIcon = () => {
    if (combo >= 5) return <Flame className="w-6 h-6 animate-bounce text-white" />;
    if (combo >= 3) return <Star className="w-6 h-6 animate-pulse text-white" />;
    return <Coins className="w-6 h-6 text-white" />;
  };

  const getComboText = () => {
    if (combo >= 5) return `🔥 COMBO ÉPICO ${combo}x!`;
    if (combo >= 3) return `⚡ COMBO ${combo}x!`;
    if (streak >= 5) return `🎯 STREAK ${streak}!`;
    return 'Moedas ganhas!';
  };

  return (
    <div 
      className="fixed z-[70] pointer-events-none"
      style={{
        left: position.x - 100,
        top: position.y - 50,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`${getPillStyle()} text-white px-6 py-4 rounded-2xl border-2 border-white/30 backdrop-blur-xl animate-bounce`}>
        <div className="flex items-center gap-3">
          {getIcon()}
          <div className="text-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              +{coins} <Coins className="w-5 h-5" />
            </div>
            <div className="text-sm opacity-90">
              {getComboText()}
            </div>
          </div>
          <Sparkles className="w-5 h-5 animate-spin text-white" />
        </div>
      </div>
    </div>
  );
}
