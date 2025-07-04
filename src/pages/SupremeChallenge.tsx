import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChallengeTimer } from '@/components/challenge/ChallengeTimer';
import { ChallengeProgress } from '@/components/challenge/ChallengeProgress';
import { ChallengeQuestionCard } from '@/components/challenge/ChallengeQuestionCard';
import { CoinPillAnimation } from '@/components/challenge/CoinPillAnimation';
import { useSupremeChallengeState } from '@/hooks/useSupremeChallengeState';
import { useChallengeQuestions } from '@/hooks/useChallengeQuestions';
import { useChallengeAudio } from '@/hooks/useChallengeAudio';
import { Trophy, ArrowRight, Home, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { type Question } from '@/types/question';
import { type ChallengeQuestion } from '@/types/premiumChallenge';

// Convert Question to ChallengeQuestion
const convertToChallengeQuestion = (question: Question): ChallengeQuestion => ({
  id: question.id,
  enunciado: question.enunciado,
  options: question.options,
  correct: question.correct,
  area: question.area,
  year: question.year,
  image: question.image
});

export default function SupremeChallenge() {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [coinAnimation, setCoinAnimation] = useState<{
    coins: number;
    combo: number;
    streak: number;
    position: { x: number; y: number };
    visible: boolean;
  } | null>(null);

  const {
    challengeState,
    startChallenge,
    answerQuestion,
    nextQuestion,
    updateTimeLeft,
    resetChallenge,
    getCoinAnimation
  } = useSupremeChallengeState();

  const { selectTenQuestions, questionsReady } = useChallengeQuestions();
  const { playSound } = useChallengeAudio();

  const currentQuestion = challengeState.questions[challengeState.currentQuestionIndex];

  // Inicializar desafio automaticamente
  useEffect(() => {
    if (questionsReady && !challengeState.isActive && !challengeState.hasCompleted) {
      try {
        const questions = selectTenQuestions();
        const challengeQuestions = questions.map(convertToChallengeQuestion);
        startChallenge(challengeQuestions);
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
        toast.error('Erro ao carregar questões. Voltando...');
        navigate('/pricing');
      }
    }
  }, [questionsReady, challengeState.isActive, challengeState.hasCompleted, selectTenQuestions, startChallenge, navigate]);

  // Ocultar navbar
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const navbar = document.querySelector('nav');
    if (navbar) {
      (navbar as HTMLElement).style.display = 'none';
    }

    return () => {
      document.body.style.overflow = 'auto';
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'block';
      }
    };
  }, []);

  const handleAnswer = (optionId: string, sourceElement?: HTMLElement) => {
    if (showFeedback) return;
    
    answerQuestion(optionId, sourceElement);
    setShowFeedback(true);

    // Verificar animação de moeda
    setTimeout(() => {
      const animation = getCoinAnimation();
      if (animation) {
        setCoinAnimation({
          ...animation,
          visible: true
        });
      }
    }, 500);
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setShowFeedback(false);
    setCoinAnimation(null);
  };

  const handleTimeUp = () => {
    toast.error("⏰ Tempo esgotado! Desafio finalizado.");
    nextQuestion(); // Finalizar
  };

  const handleTimeWarning = (timeLeft: number) => {
    if (timeLeft === 120) {
      toast.warning("⏰ Apenas 2 minutos restantes!", {
        duration: 3000,
        className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
      });
    } else if (timeLeft === 60) {
      toast.error("🚨 ÚLTIMO MINUTO! Finalize rapidamente!", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    resetChallenge();
    const questions = selectTenQuestions();
    const challengeQuestions = questions.map(convertToChallengeQuestion);
    startChallenge(challengeQuestions);
  };

  // Tela de carregamento
  if (!questionsReady || !challengeState.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold mb-4">🚀 PREPARANDO DESAFIO SUPREMO</h2>
          <p className="text-xl text-gray-300">Selecionando as 10 melhores questões...</p>
        </div>
      </div>
    );
  }

  // Tela de resultado
  if (challengeState.hasCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-800/95 to-gray-800/95 backdrop-blur-xl rounded-3xl border-2 border-purple-400/40 shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            {challengeState.hasWon ? (
              <>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  🏆 DESAFIO CONQUISTADO! 🏆
                </h2>
                <p className="text-2xl text-green-400 mb-6">
                  Parabéns! Você desbloqueou o desconto Premium!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-4 text-blue-400">
                  💪 Quase lá!
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Você acertou {challengeState.score}/10 questões. Tente novamente!
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-900/40 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-400">{challengeState.score}/10</div>
              <div className="text-blue-300">Acertos</div>
            </div>
            <div className="bg-yellow-900/40 p-4 rounded-xl">
              <div className="text-2xl font-bold text-yellow-400">{challengeState.coinsEarned}</div>
              <div className="text-yellow-300">Moedas</div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-xl font-bold rounded-2xl shadow-xl"
            >
              <Home className="w-6 h-6 mr-2" />
              Voltar ao Início
            </Button>
            
            {!challengeState.hasWon && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full border-2 border-purple-400 text-purple-300 hover:bg-purple-400/10 px-8 py-4 text-lg font-bold rounded-2xl"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Tentar Novamente
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tela principal do desafio
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-bounce"></div>
      </div>

      {/* Timer */}
      <ChallengeTimer
        initialSeconds={600}
        isRunning={challengeState.isActive && !showFeedback}
        onTimeUp={handleTimeUp}
        onTimeWarning={handleTimeWarning}
      />

      {/* Progress */}
      <ChallengeProgress
        currentQuestion={challengeState.currentQuestionIndex + 1}
        totalQuestions={challengeState.questions.length}
        score={challengeState.score}
        combo={challengeState.combo}
        streak={challengeState.streak}
        coinsEarned={challengeState.coinsEarned}
      />

      {/* Question Card */}
      <div className="p-6 pt-4">
        {currentQuestion && (
          <ChallengeQuestionCard
            key={`${currentQuestion.id}-${challengeState.currentQuestionIndex}`}
            question={currentQuestion}
            questionNumber={challengeState.currentQuestionIndex + 1}
            totalQuestions={challengeState.questions.length}
            onAnswer={handleAnswer}
            userAnswer={challengeState.answers[currentQuestion.id]}
            showAnswer={showFeedback}
            streak={challengeState.streak}
            combo={challengeState.combo}
          />
        )}

        {/* Botão de continuar */}
        {showFeedback && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {challengeState.currentQuestionIndex === challengeState.questions.length - 1 ? (
                <>
                  <Trophy className="w-6 h-6 mr-2" />
                  FINALIZAR DESAFIO
                </>
              ) : (
                <>
                  PRÓXIMA QUESTÃO
                  <ArrowRight className="w-6 h-6 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Coin Animation */}
      {coinAnimation && (
        <CoinPillAnimation
          coins={coinAnimation.coins}
          combo={coinAnimation.combo}
          streak={coinAnimation.streak}
          isVisible={coinAnimation.visible}
          position={coinAnimation.position}
          onAnimationComplete={() => setCoinAnimation(null)}
        />
      )}
    </div>
  );
}
