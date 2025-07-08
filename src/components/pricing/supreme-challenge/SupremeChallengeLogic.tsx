
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getFixedSupremeChallengeQuestions } from '@/utils/fixedSupremeChallengeQuestions';
import { toast } from 'sonner';

export function useSupremeChallengeLogic() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Challenge states
  const [showSupremeModal, setShowSupremeModal] = useState(false);
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);

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
    try {
      const fixedQuestions = getFixedSupremeChallengeQuestions();
      setChallengeQuestions(fixedQuestions);
      setChallengeReady(true);

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
    } catch (error) {
      console.error('❌ Erro ao preparar questões fixas:', error);
      toast.error("Erro ao carregar desafio. Tente novamente!");
    }
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
      duration: 2000
    });
  };

  return {
    showSupremeModal,
    challengeQuestions,
    challengeReady,
    attemptsUsed,
    maxAttempts,
    canStartChallenge,
    attemptsLeft,
    hasWonBefore,
    handleStartChallenge,
    handleCloseSupremeModal,
    handleVictory,
    handleChallengeEnd,
    resetAttempts
  };
}
