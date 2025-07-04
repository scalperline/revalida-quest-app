
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ChallengeActionProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  isStarting: boolean;
  onStartChallenge: () => void;
  onResetAttempts?: () => void;
}

export function ChallengeAction({ 
  canStartChallenge, 
  attemptsLeft, 
  isStarting, 
  onStartChallenge, 
  onResetAttempts 
}: ChallengeActionProps) {
  const navigate = useNavigate();

  const handleStartChallenge = () => {
    // Navegar para a página do desafio supremo
    navigate('/supreme-challenge');
  };

  if (canStartChallenge) {
    return (
      <>
        <Button 
          onClick={handleStartChallenge}
          disabled={isStarting}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-lg md:text-2xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 py-4 px-8 md:py-6 md:px-12 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isStarting ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              PREPARANDO DESAFIO...
            </div>
          ) : (
            <>🚀 ACEITAR DESAFIO SUPREMO 🚀</>
          )}
        </Button>
        
        <div className="flex items-center gap-3 md:gap-6 bg-gradient-to-r from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-600/30">
          <div className="flex gap-2 md:gap-3">
            {[...Array(attemptsLeft)].map((_, i) => (
              <div key={i} className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg animate-pulse"></div>
            ))}
            {[...Array(3 - attemptsLeft)].map((_, i) => (
              <div key={i} className="w-4 h-4 md:w-5 md:h-5 bg-gray-600 rounded-full"></div>
            ))}
          </div>
          <p className="text-sm md:text-lg text-gray-300">
            <span className="text-yellow-400 font-bold">{attemptsLeft}</span> tentativas restantes
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="text-center bg-gradient-to-br from-red-900/60 to-red-800/60 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-red-400/30">
      <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-4 animate-pulse" />
      <p className="text-xl md:text-3xl font-bold text-red-300 mb-2 md:mb-3">
        ⚡ Energia Esgotada ⚡
      </p>
      <p className="text-red-200 text-sm md:text-lg mb-4">
        Você utilizou todas as 3 tentativas disponíveis
      </p>
      {onResetAttempts && (
        <Button 
          onClick={onResetAttempts}
          variant="outline"
          className="border-2 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10 text-sm px-4 py-2"
        >
          🔄 Resetar Tentativas (Debug)
        </Button>
      )}
    </div>
  );
}
