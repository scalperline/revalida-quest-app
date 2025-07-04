
import { CheckCircle, XCircle } from 'lucide-react';

interface ChallengeFeedbackOverlayProps {
  isVisible: boolean;
  isCorrect: boolean | null;
  combo: number;
}

export function ChallengeFeedbackOverlay({ isVisible, isCorrect, combo }: ChallengeFeedbackOverlayProps) {
  if (!isVisible || isCorrect === null) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`text-center p-8 rounded-3xl shadow-2xl max-w-md mx-4 ${
        isCorrect 
          ? 'bg-gradient-to-br from-green-500/90 to-emerald-600/90' 
          : 'bg-gradient-to-br from-red-500/90 to-red-600/90'
      }`}>
        <div className="mb-4">
          {isCorrect ? (
            <CheckCircle className="w-16 h-16 text-white mx-auto animate-bounce" />
          ) : (
            <XCircle className="w-16 h-16 text-white mx-auto animate-pulse" />
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {isCorrect ? 'CORRETO!' : 'INCORRETO!'}
        </h3>
        {isCorrect && (
          <p className="text-lg text-white/90 mb-3">
            {combo >= 3 ? `🔥 COMBO ${combo}x!` : 'Excelente!'}
          </p>
        )}
        {!isCorrect && (
          <p className="text-lg text-white/90">
            Continue tentando! Você consegue!
          </p>
        )}
      </div>
    </div>
  );
}
