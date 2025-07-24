
import { Loader2, Sparkles } from 'lucide-react';

export function ChallengeLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-6">
        <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">🚀 PREPARANDO DESAFIO SUPREMO</h3>
        <p className="text-gray-300 text-lg mb-4">Selecionando as 10 melhores questões do Revalida</p>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
          <div className="flex items-center justify-center gap-3 text-yellow-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">Questões validadas • Dificuldade balanceada • 100% funcionais</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
