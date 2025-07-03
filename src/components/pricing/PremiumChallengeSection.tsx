
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Timer, Zap, Gift } from 'lucide-react';
import { ChallengeModal } from './ChallengeModal';
import { SuccessRewardModal } from './SuccessRewardModal';

interface PremiumChallengeSectionProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  onStartChallenge: () => boolean;
  onResetAttempts: () => void;
}

export function PremiumChallengeSection({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  onStartChallenge,
  onResetAttempts
}: PremiumChallengeSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  console.log('=== RENDER PREMIUM CHALLENGE SECTION ===');
  console.log('showModal:', showModal);
  console.log('canStartChallenge:', canStartChallenge);
  console.log('attemptsLeft:', attemptsLeft);
  console.log('isStarting:', isStarting);

  const handleStartChallenge = () => {
    console.log('=== HANDLE START CHALLENGE ===');
    setIsStarting(true);
    
    const result = onStartChallenge();
    console.log('Challenge start result:', result);
    
    if (result) {
      setShowModal(true);
    }
    
    setIsStarting(false);
  };

  const handleChallengeComplete = (passed: boolean) => {
    console.log('=== HANDLE CHALLENGE COMPLETE ===');
    console.log('Challenge passed:', passed);
    
    setShowModal(false);
    
    if (passed) {
      setShowRewardModal(true);
    }
  };

  const handleCloseRewardModal = () => {
    setShowRewardModal(false);
  };

  const buttonText = isStarting 
    ? 'Iniciando...' 
    : canStartChallenge 
      ? 'Aceitar Desafio Premium' 
      : 'Sem tentativas';

  return (
    <>
      <Card className="relative overflow-hidden border-2 border-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-50"></div>
        
        <CardHeader className="relative text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Desafio Premium GRÁTIS
            </CardTitle>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
          
          <CardDescription className="text-lg text-gray-700 max-w-2xl mx-auto">
            Responda 10 questões consecutivas corretamente e ganhe acesso premium por 1 mês!
          </CardDescription>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              10 questões seguidas
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              2 minutos por questão
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              Premium GRÁTIS
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative text-center">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center p-4 bg-white/80 rounded-lg shadow-sm">
              <Zap className="w-12 h-12 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Acesso Imediato</h3>
              <p className="text-sm text-gray-600 text-center">
                Ganhe acesso premium instantaneamente após completar o desafio
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/80 rounded-lg shadow-sm">
              <Target className="w-12 h-12 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Desafio Justo</h3>
              <p className="text-sm text-gray-600 text-center">
                Questões do mesmo nível que você já pratica no app
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/80 rounded-lg shadow-sm">
              <Trophy className="w-12 h-12 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Recompensa Premium</h3>
              <p className="text-sm text-gray-600 text-center">
                30 dias de acesso completo a todos os recursos premium
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <Badge 
                variant={canStartChallenge ? "default" : "secondary"} 
                className="text-base px-4 py-2"
              >
                Tentativas restantes: {attemptsLeft}
              </Badge>
              
              {hasWonBefore && (
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                  <Trophy className="w-4 h-4 mr-2" />
                  Já ganhou antes!
                </Badge>
              )}
            </div>

            <Button
              onClick={handleStartChallenge}
              disabled={!canStartChallenge || isStarting}
              size="lg"
              className="w-full max-w-md mx-auto h-14 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isStarting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Iniciando...
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6 mr-3" />
                  {buttonText}
                </>
              )}
            </Button>

            {!canStartChallenge && attemptsLeft === 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 mb-3">
                  Você esgotou suas tentativas por hoje. Volte amanhã para tentar novamente!
                </p>
                <Button
                  onClick={onResetAttempts}
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  Resetar tentativas (apenas para teste)
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <ChallengeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onComplete={handleChallengeComplete}
        />
      )}

      {showRewardModal && (
        <SuccessRewardModal
          isOpen={showRewardModal}
          onClose={handleCloseRewardModal}
        />
      )}
    </>
  );
}
