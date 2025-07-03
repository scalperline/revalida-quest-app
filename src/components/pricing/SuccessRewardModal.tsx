
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Crown, Star, Zap, Target, Brain } from 'lucide-react';

interface SuccessRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  challengeType: 'basic' | 'supreme';
}

export function SuccessRewardModal({ isOpen, onClose, score, total, challengeType }: SuccessRewardModalProps) {
  const isBasicChallenge = challengeType === 'basic';
  const isPerfectScore = score === total;
  
  const rewards = {
    basic: {
      xp: 150,
      title: 'Desafio Básico Conquistado!',
      subtitle: 'Você provou seu conhecimento fundamental',
      icon: Target,
      gradient: 'from-blue-500 via-cyan-500 to-blue-600'
    },
    supreme: {
      xp: 500,
      title: 'Desafio Supremo Dominado!',
      subtitle: 'Você é uma lenda do Revalida!',
      icon: Brain,
      gradient: 'from-purple-500 via-pink-500 to-red-500'
    }
  };

  const reward = rewards[challengeType];
  const IconComponent = reward.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 border-0 bg-transparent">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${reward.gradient} p-1 shadow-2xl`}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-400/20 rounded-full animate-pulse blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-400/20 rounded-full animate-bounce blur-lg"></div>
            </div>

            {/* Trophy Animation */}
            <div className="relative z-10 mb-6">
              <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${reward.gradient} rounded-full flex items-center justify-center shadow-2xl animate-bounce relative`}>
                <IconComponent className="w-12 h-12 text-white" />
                {challengeType === 'supreme' && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Success Message */}
            <div className="relative z-10 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                🎉 {reward.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {reward.subtitle}
              </p>
              
              {/* Score Display */}
              <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${reward.gradient} text-white px-6 py-3 rounded-full shadow-lg mb-6`}>
                <Trophy className="w-6 h-6" />
                <span className="text-xl font-bold">
                  {score}/{total} {isPerfectScore ? '- PERFEITO!' : ''}
                </span>
              </div>
            </div>

            {/* XP Reward */}
            <div className="relative z-10 mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Zap className="w-8 h-8 animate-pulse" />
                  <span className="text-3xl font-bold">+{reward.xp} XP</span>
                  <Zap className="w-8 h-8 animate-pulse" />
                </div>
                <p className="text-lg opacity-90">
                  Adicionado ao seu ranking nacional!
                </p>
                {challengeType === 'supreme' && isPerfectScore && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-200 animate-spin" />
                    <span className="text-sm font-bold text-yellow-200">
                      Bônus de Perfeição Incluído!
                    </span>
                    <Star className="w-5 h-5 text-yellow-200 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Achievements Unlocked */}
            <div className="relative z-10 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🏆 Conquistas Desbloqueadas
              </h3>
              <div className="space-y-2">
                {isBasicChallenge ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 dark:text-blue-200 font-medium">
                        🎯 Conquistador Básico
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="text-purple-800 dark:text-purple-200 font-medium">
                          🧠 Mestre Supremo
                        </span>
                      </div>
                    </div>
                    {isPerfectScore && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-yellow-600" />
                          <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                            🎯 Sniper do Gabarito
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              className={`bg-gradient-to-r ${reward.gradient} hover:opacity-90 text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              ✨ Continuar Jornada
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
