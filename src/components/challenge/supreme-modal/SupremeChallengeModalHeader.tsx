
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Coins, Trophy, X, Zap, Flame, Target } from 'lucide-react';

interface SupremeChallengeModalHeaderProps {
  minutes: number;
  seconds: number;
  urgencyLevel: string;
  percentage: number;
  coinSystem: any;
  score: number;
  onClose: () => void;
}

export function SupremeChallengeModalHeader({
  minutes,
  seconds,
  urgencyLevel,
  percentage,
  coinSystem,
  score,
  onClose
}: SupremeChallengeModalHeaderProps) {
  const getTimerColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'text-red-400 animate-pulse';
      case 'warning': return 'text-orange-400';
      case 'caution': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getProgressBarColor = () => {
    switch (urgencyLevel) {
      case 'critical': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'warning': return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'caution': return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      default: return 'bg-gradient-to-r from-green-500 to-green-600';
    }
  };

  return (
    <div className="relative bg-black/30 backdrop-blur-lg border-b border-purple-400/20">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-purple-600/5"></div>
      
      <div className="relative z-10 px-4 sm:px-6 py-4">
        {/* Linha superior com título e botão fechar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                DESAFIO SUPREMO
              </h1>
              <p className="text-sm text-gray-300">Complete 10 questões para conquistar o desconto</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Linha principal com métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Timer com barra de progresso */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className={`w-4 h-4 ${getTimerColor()}`} />
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Tempo</span>
            </div>
            <div className={`text-2xl font-bold ${getTimerColor()}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full transition-all duration-1000 ${getProgressBarColor()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Score */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Acertos</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {score}<span className="text-gray-400 text-lg">/10</span>
            </div>
            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${(score / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Moedas e Combo */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Moedas</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-yellow-400">
                {coinSystem.sessionCoins}
              </div>
              {coinSystem.combo >= 3 && (
                <Badge 
                  className={`text-xs px-2 py-1 ${
                    coinSystem.combo >= 10 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    coinSystem.combo >= 5 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    'bg-gradient-to-r from-yellow-500 to-orange-500'
                  } text-white animate-pulse`}
                >
                  {coinSystem.combo >= 10 ? <Zap className="w-3 h-3 mr-1" /> :
                   coinSystem.combo >= 5 ? <Flame className="w-3 h-3 mr-1" /> :
                   <Trophy className="w-3 h-3 mr-1" />}
                  {coinSystem.combo}x
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
