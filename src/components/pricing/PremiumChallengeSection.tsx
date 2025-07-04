
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { ChallengeModal } from './ChallengeModal';
import { ChallengeCard } from './challenge/ChallengeCard';
import { ChallengeHeader } from './challenge/ChallengeHeader';
import { ChallengeRequirements } from './challenge/ChallengeRequirements';
import { ChallengeReward } from './challenge/ChallengeReward';
import { ChallengeAction } from './challenge/ChallengeAction';
import { toast } from 'sonner';

interface PremiumChallengeSectionProps {
  canStartChallenge: boolean;
  attemptsLeft: number;
  hasWonBefore: boolean;
  onStartChallenge: () => Promise<boolean>;
  onResetAttempts?: () => void;
}

export function PremiumChallengeSection({
  canStartChallenge,
  attemptsLeft,
  hasWonBefore,
  onStartChallenge,
  onResetAttempts
}: PremiumChallengeSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartChallenge = async () => {
    console.log('=== BOTÃO DESAFIO CLICADO ===');
    console.log('Pode iniciar desafio?', canStartChallenge);
    console.log('Tentativas restantes:', attemptsLeft);
    
    if (!canStartChallenge) {
      console.log('❌ Não pode iniciar desafio - tentativas esgotadas');
      toast.error("Você já utilizou todas as tentativas disponíveis!", {
        duration: 3000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return;
    }

    setIsStarting(true);
    
    try {
      console.log('🚀 Preparando desafio...');
      
      // ABRIR MODAL IMEDIATAMENTE
      setShowModal(true);
      
      // INICIAR DESAFIO
      const started = await onStartChallenge();
      console.log('Desafio iniciado?', started);
      
      if (started) {
        console.log('✅ Desafio iniciado com sucesso - modal já aberto');
        toast.success("Desafio Supremo iniciado! Boa sorte! 🚀", {
          duration: 2000,
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
        });
      } else {
        console.log('❌ Falha ao iniciar desafio - fechando modal');
        setShowModal(false);
        toast.error("Erro ao iniciar o desafio. Tente novamente!", {
          duration: 3000,
          className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
        });
      }
    } catch (error) {
      console.error('❌ Erro ao iniciar desafio:', error);
      setShowModal(false);
      toast.error("Erro inesperado. Tente novamente!", {
        duration: 3000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    } finally {
      setIsStarting(false);
    }
  };

  const handleCloseModal = () => {
    console.log('🚪 Fechando modal...');
    setShowModal(false);
  };

  console.log('=== RENDER PREMIUM CHALLENGE SECTION ===');
  console.log('showModal:', showModal);
  console.log('canStartChallenge:', canStartChallenge);
  console.log('attemptsLeft:', attemptsLeft);
  console.log('isStarting:', isStarting);

  return (
    <>
      <ChallengeCard>
        <ChallengeHeader hasWonBefore={hasWonBefore} />

        <CardContent className="relative z-10 text-center px-3 md:px-6">
          <ChallengeRequirements />
          <ChallengeReward />
          
          <div className="flex flex-col items-center gap-4 md:gap-8">
            <ChallengeAction
              canStartChallenge={canStartChallenge}
              attemptsLeft={attemptsLeft}
              isStarting={isStarting}
              onStartChallenge={handleStartChallenge}
              onResetAttempts={onResetAttempts}
            />
          </div>
        </CardContent>
      </ChallengeCard>

      <ChallengeModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
