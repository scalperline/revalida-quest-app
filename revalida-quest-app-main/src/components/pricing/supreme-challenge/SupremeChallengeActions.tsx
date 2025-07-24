
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy } from 'lucide-react';

interface SupremeChallengeActionsProps {
  hasWonBefore: boolean;
  canStartChallenge: boolean;
  onStartChallenge: () => void;
  onResetAttempts: () => void;
  attemptsLeft: number;
}

export function SupremeChallengeActions({
  hasWonBefore,
  canStartChallenge,
  onStartChallenge,
  onResetAttempts,
  attemptsLeft
}: SupremeChallengeActionsProps) {
  if (hasWonBefore) {
    return (
      <div className="text-center">
        <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm px-4 py-2">
          🏆 Desafio Conquistado!
        </Badge>
        <Button onClick={onResetAttempts} variant="outline" className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold border-2 border-red-400 text-red-600 hover:bg-red-50">
          🔄 Resetar Tentativas
        </Button>
      </div>
    );
  }

  if (canStartChallenge) {
    return (
      <div className="space-y-3">
        <Button onClick={onStartChallenge} className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] rounded-2xl border-0 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black animate-pulse-enhanced">
          <div className="flex items-center justify-center gap-2">
            <Crown className="w-4 h-4 lg:w-5 lg:h-5" />
            Aceitar Desafio
            <Trophy className="w-4 h-4 lg:w-5 lg:h-5" />
          </div>
        </Button>
        
        {/* Visualizador de tentativas */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <span>Tentativas restantes:</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < attemptsLeft 
                      ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-yellow-400">{attemptsLeft}/3</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button disabled className="w-full py-3 lg:py-4 text-base lg:text-lg font-bold rounded-2xl border-0 bg-gray-400 text-white opacity-75 cursor-not-allowed">
        ❌ Tentativas Esgotadas
      </Button>
      
      {/* Visualizador de tentativas esgotadas */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
          <span>Tentativas restantes:</span>
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/20"
              />
            ))}
          </div>
          <span className="font-bold text-red-400">0/3</span>
        </div>
      </div>
    </div>
  );
}
