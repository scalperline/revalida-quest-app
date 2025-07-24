
import { AlertCircle, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChallengeErrorStateProps {
  error: string;
  onRetry: () => Promise<void>;
  onClose: () => void;
  isRetrying: boolean;
}

export function ChallengeErrorState({ error, onRetry, onClose, isRetrying }: ChallengeErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-6">
        <AlertCircle className="w-16 h-16 text-red-400 animate-pulse mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">❌ ERRO NO DESAFIO</h3>
        <p className="text-red-300 text-lg mb-6">{error}</p>
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-bold"
          >
            {isRetrying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Tentando...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </>
            )}
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="border-2 border-gray-400 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-full font-bold"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
