
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { SupremeChallengeModal } from '@/components/challenge/SupremeChallengeModal';
import { SupremeChallengeHeader } from './supreme-challenge/SupremeChallengeHeader';
import { SupremeChallengeContent } from './supreme-challenge/SupremeChallengeContent';
import { toast } from 'sonner';

interface SupremeChallengeProps {
  todasQuestoes: any[];
  challengeQuestions: any[];
  challengeReady: boolean;
  setChallengeQuestions: (questions: any[]) => void;
  setChallengeReady: (ready: boolean) => void;
}

export function SupremeChallengeSection({
  todasQuestoes,
  challengeQuestions,
  challengeReady,
  setChallengeQuestions,
  setChallengeReady
}: SupremeChallengeProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Challenge states
  const [showSupremeModal, setShowSupremeModal] = useState(false);

  // Attempts system
  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('supreme_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });
  const maxAttempts = 3;
  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('supreme_challenge_won') === 'true';

  const handleStartChallenge = async () => {
    console.log('🚀 Iniciando Desafio Supremo');
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!canStartChallenge) {
      toast.error("Você já utilizou todas as 3 tentativas disponíveis!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return;
    }

    if (!challengeReady || challengeQuestions.length === 0) {
      toast.error("Questões ainda carregando. Aguarde um momento!", {
        duration: 3000,
        className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
      });
      return;
    }

    // Hide navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('navbar-hidden');
    }
    
    setShowSupremeModal(true);
    
    toast.success("🏆 Desafio Supremo iniciado! Boa sorte!", {
      duration: 2000,
      className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
    });
  };

  const handleCloseSupremeModal = () => {
    setShowSupremeModal(false);
    
    // Show navbar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
    }
  };

  const handleVictory = (coins: number, discount: number) => {
    console.log('🏆 VITÓRIA NO DESAFIO SUPREMO! Coins:', coins, 'Discount:', discount);
    setShowSupremeModal(false);
    
    // Mark as won and increment attempts
    localStorage.setItem('supreme_challenge_won', 'true');
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
    
    // Show navbar again
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
    }
    
    toast.success("🏆 DESAFIO SUPREMO CONQUISTADO! Seu prêmio está no card abaixo!", {
      duration: 6000,
      className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
    });

    // Force re-render to show the victory state in the card
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleChallengeEnd = () => {
    // Increment attempts on challenge end (win or lose)
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);
    localStorage.setItem('supreme_challenge_attempts', newAttempts.toString());
  };

  const resetAttempts = () => {
    console.log('🔄 RESETANDO tentativas (modo debug)');
    localStorage.removeItem('supreme_challenge_attempts');
    localStorage.removeItem('supreme_challenge_won');
    setAttemptsUsed(0);
    toast.success("Tentativas resetadas!", {
      duration: 2000,
    });
  };

  return (
    <div className="relative mb-16">
      {/* Epic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-red-800/30 to-red-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-red-700/20 to-red-600/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-red-600/10 to-red-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>
      
      <Card className="relative overflow-hidden border border-blue-900 bg-gradient-to-br from-red-900/95 via-red-800/20 to-red-900/95 backdrop-blur-xl shadow-2xl">
        <SupremeChallengeHeader hasWonBefore={hasWonBefore} attemptsLeft={attemptsLeft} />
        
        <SupremeChallengeContent
          canStartChallenge={canStartChallenge}
          attemptsLeft={attemptsLeft}
          hasWonBefore={hasWonBefore}
          challengeReady={challengeReady}
          onStartChallenge={handleStartChallenge}
          onResetAttempts={resetAttempts}
        />
      </Card>

      {/* Supreme Challenge Modal */}
      <SupremeChallengeModal
        isOpen={showSupremeModal}
        onClose={handleCloseSupremeModal}
        onVictory={handleVictory}
        onChallengeEnd={handleChallengeEnd}
        questions={challengeQuestions}
      />
    </div>
  );
}
