
import { Sparkles, Rocket, Shield, Target, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ChallengeReward() {
  return (
    <div className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-md rounded-2xl p-6 md:p-10 mb-6 md:mb-10 border border-purple-400/40 shadow-xl">
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-8">
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
        <h3 className="text-xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
          RECOMPENSA ÉPICA
        </h3>
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
      </div>
      
      <div className="mb-6 md:mb-8">
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
          <span className="text-gray-300 block sm:inline">Premium por </span>
          <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">R$ 29,90/mês</span>
        </div>
        
        <div className="flex items-center justify-center gap-3 md:gap-6 mb-4 md:mb-8">
          <span className="text-xl md:text-3xl text-gray-400 line-through">R$ 79,90</span>
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 md:px-6 md:py-3 font-bold text-sm md:text-xl shadow-lg">
            40% OFF
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-sm md:text-lg">
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-xl border border-blue-400/20">
          <Rocket className="w-5 h-5 md:w-6 md:h-6 text-blue-400 flex-shrink-0" />
          <span className="text-blue-200">Acesso Premium completo</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-400/20">
          <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-400 flex-shrink-0" />
          <span className="text-purple-200">IA avançada personalizada</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-400/20">
          <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
          <span className="text-green-200">Análises preditivas</span>
        </div>
      </div>
    </div>
  );
}
