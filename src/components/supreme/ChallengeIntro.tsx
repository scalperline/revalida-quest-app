
import { Trophy, Clock, Target, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChallengeIntroProps {
  onStartChallenge: () => void;
}

export function ChallengeIntro({ onStartChallenge }: ChallengeIntroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título principal */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Crown className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              DESAFIO SUPREMO
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Conquiste o desconto Premium de <span className="text-yellow-400 font-bold">40% OFF</span>
          </p>
        </div>

        {/* Regras do desafio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/60 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-blue-200 mb-2">10 Minutos</h3>
            <p className="text-blue-300 text-sm">Cronômetro regressivo para completar o desafio</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/60 to-green-800/60 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-green-200 mb-2">10 Questões</h3>
            <p className="text-green-300 text-sm">Questões selecionadas do Revalida</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-purple-200 mb-2">8+ Acertos</h3>
            <p className="text-purple-300 text-sm">Mínimo para conquistar o desconto</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900/60 to-orange-900/60 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-yellow-200 mb-2">Gamificação</h3>
            <p className="text-yellow-300 text-sm">Combos, streaks e moedas extras</p>
          </div>
        </div>

        {/* Recompensa */}
        <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-purple-400/50 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              RECOMPENSA ÉPICA
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          
          <div className="text-4xl font-bold mb-4">
            <span className="text-gray-300">Premium por apenas </span>
            <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
              R$ 29,90/mês
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-xl text-gray-400 line-through">R$ 49,90</span>
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold">
              40% OFF
            </span>
          </div>
          
          <p className="text-gray-300">
            Acesso completo aos recursos Premium + IA personalizada + Simulados ilimitados
          </p>
        </div>

        {/* Botão de início */}
        <Button
          onClick={onStartChallenge}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-2xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 py-6 px-12"
        >
          🚀 INICIAR DESAFIO SUPREMO 🚀
        </Button>
      </div>
    </div>
  );
}
