
import { useState } from 'react';
import { useSupremeChallenge } from '@/hooks/useSupremeChallenge';
import { useSubscription } from '@/hooks/useSubscription';
import { ChallengeIntro } from '@/components/supreme/ChallengeIntro';
import { ChallengeQuestion } from '@/components/supreme/ChallengeQuestion';
import { ChallengeTimer } from '@/components/supreme/ChallengeTimer';
import { ChallengeProgress } from '@/components/supreme/ChallengeProgress';
import { ChallengeRewardModal } from '@/components/supreme/ChallengeRewardModal';
import { CoinPillAnimation } from '@/components/supreme/CoinPillAnimation';

export default function SupremeChallenge() {
  const {
    challengeState,
    selectedAnswer,
    showFeedback,
    isCorrect,
    startChallenge,
    answerQuestion,
    confirmAnswer,
    nextQuestion,
    resetChallenge
  } = useSupremeChallenge();

  const { createCheckoutSession } = useSubscription();
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCoinPill, setShowCoinPill] = useState(false);
  const [coinAmount, setCoinAmount] = useState(0);

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];

  // Mostrar modal de recompensa quando completar
  useState(() => {
    if (challengeState.hasCompleted && challengeState.hasWon) {
      setShowRewardModal(true);
    }
  }, [challengeState.hasCompleted, challengeState.hasWon]);

  // Animação de moedas
  const triggerCoinAnimation = (amount: number) => {
    setCoinAmount(amount);
    setShowCoinPill(true);
    setTimeout(() => setShowCoinPill(false), 2000);
  };

  const handlePremiumCheckout = async () => {
    try {
      const checkoutUrl = await createCheckoutSession('price_revalida_premium_discount');
      window.open(checkoutUrl, '_blank');
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full animate-spin-slow"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        {!challengeState.isActive && !challengeState.hasCompleted && (
          <ChallengeIntro onStartChallenge={startChallenge} />
        )}

        {challengeState.isActive && currentQuestion && (
          <div className="container mx-auto px-4 py-8">
            {/* Header com timer e progresso */}
            <div className="flex justify-between items-center mb-8">
              <ChallengeTimer timeLeft={challengeState.timeLeft} />
              <ChallengeProgress
                current={challengeState.currentQuestionIndex + 1}
                total={challengeState.questions.length}
                score={challengeState.score}
                streak={challengeState.streak}
                combo={challengeState.combo}
              />
            </div>

            {/* Questão */}
            <ChallengeQuestion
              question={currentQuestion}
              questionNumber={challengeState.currentQuestionIndex + 1}
              totalQuestions={challengeState.questions.length}
              selectedAnswer={selectedAnswer}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              onAnswerSelect={answerQuestion}
              onConfirmAnswer={confirmAnswer}
              onNextQuestion={nextQuestion}
            />
          </div>
        )}

        {challengeState.hasCompleted && !challengeState.hasWon && (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-sm rounded-3xl p-12 border border-red-400/30 shadow-2xl max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-red-300 mb-6">
                ⚡ Desafio Não Conquistado ⚡
              </h2>
              <p className="text-xl text-red-200 mb-8">
                Você acertou {challengeState.score} de {challengeState.questions.length} questões.
                <br />
                Precisa de pelo menos 8 acertos para conquistar o desconto!
              </p>
              <button
                onClick={resetChallenge}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105"
              >
                🔄 Tentar Novamente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animação de moedas */}
      <CoinPillAnimation
        isVisible={showCoinPill}
        amount={coinAmount}
        onComplete={() => setShowCoinPill(false)}
      />

      {/* Modal de recompensa */}
      <ChallengeRewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        score={challengeState.score}
        totalQuestions={challengeState.questions.length}
        coinsEarned={challengeState.coinsEarned}
        onClaimReward={handlePremiumCheckout}
      />
    </div>
  );
}
