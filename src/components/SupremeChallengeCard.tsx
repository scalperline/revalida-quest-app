
import { Link } from 'react-router-dom';
import { Crown, Trophy, Clock, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SupremeChallengeCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-red-900/90 backdrop-blur-sm border-2 border-purple-400/50 shadow-2xl relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-orange-400/20 rounded-full animate-bounce"></div>
        <Sparkles className="absolute top-4 left-4 w-6 h-6 text-purple-400/50 animate-spin" />
        <Crown className="absolute top-4 right-4 w-8 h-8 text-yellow-400/50 animate-pulse" />
      </div>

      <CardHeader className="relative z-10 text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            DESAFIO SUPREMO
          </span>
        </h2>
        
        <p className="text-gray-300 text-sm">
          Conquiste 40% de desconto no Premium
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Regras rápidas */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <Clock className="w-4 h-4" />
            <span>10 minutos</span>
          </div>
          <div className="flex items-center gap-2 text-green-300">
            <Target className="w-4 h-4" />
            <span>10 questões</span>
          </div>
        </div>

        {/* Recompensa */}
        <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/60 backdrop-blur-sm rounded-lg p-3 border border-green-400/30">
          <div className="text-center">
            <div className="text-lg font-bold text-green-300 mb-1">
              Premium R$ 29,90/mês
            </div>
            <div className="text-xs text-green-400">
              <span className="line-through text-gray-400">R$ 49,90</span> • 40% OFF
            </div>
          </div>
        </div>

        {/* Botão de ação */}
        <Link to="/supreme-challenge">
          <Button className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            🚀 ACEITAR DESAFIO
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
