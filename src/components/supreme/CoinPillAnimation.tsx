
import { useState, useEffect } from 'react';
import { Coins, Sparkles } from 'lucide-react';

interface CoinPillAnimationProps {
  isVisible: boolean;
  amount: number;
  onComplete: () => void;
}

export function CoinPillAnimation({ isVisible, amount, onComplete }: CoinPillAnimationProps) {
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    if (isVisible && amount > 0) {
      setShowPill(true);
      
      const timer = setTimeout(() => {
        setShowPill(false);
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, amount, onComplete]);

  if (!showPill) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Coins className="w-6 h-6 animate-spin" />
          <div className="text-center">
            <div className="text-2xl font-bold">+{amount} Moedas</div>
            <div className="text-sm opacity-90">Acumulando para desconto!</div>
          </div>
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
