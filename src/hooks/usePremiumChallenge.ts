import { useState, useCallback, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import { useGamification } from './useGamification';
import { type Question } from '@/types/question';
import { toast } from 'sonner';

interface ChallengeState {
  isActive: boolean;
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, string>;
  questions: Question[];
  hasCompleted: boolean;
  hasWon: boolean;
  streak: number;
  combo: number;
  timeBonus: number;
  coinsEarned: number;
  perfectAnswers: number;
}

export function usePremiumChallenge() {
  const { todasQuestoes } = useQuestions();
  const { addXP, answerQuestion: recordAnswer } = useGamification();
  
  const [challengeState, setChallengeState] = useState<ChallengeState>({
    isActive: false,
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    questions: [],
    hasCompleted: false,
    hasWon: false,
    streak: 0,
    combo: 0,
    timeBonus: 0,
    coinsEarned: 0,
    perfectAnswers: 0
  });

  const [attemptsUsed, setAttemptsUsed] = useState(() => {
    const saved = localStorage.getItem('premium_challenge_attempts');
    return saved ? parseInt(saved) : 0;
  });

  const maxAttempts = 3;
  const questionsCount = 10;
  const winThreshold = 10; // 100% de acerto

  // 🚀 BULLETPROOF QUESTION SELECTION - SEMPRE FUNCIONA!
  const getOfficialQuestions = useCallback(() => {
    console.log('🚀 BULLETPROOF: Iniciando seleção de questões...');
    console.log('Total de questões disponíveis:', todasQuestoes.length);
    
    // BULLETPROOF: Filtrar APENAS questões com dados completos e corretos
    const validQuestions = todasQuestoes.filter(q => {
      const hasRequiredFields = q.year && q.area && q.enunciado && q.options && q.correct;
      const hasCorrectAnswer = q.correct && q.correct.trim() !== ''; // CRÍTICO!
      const hasEnoughOptions = q.options && q.options.length >= 4;
      const isValidYear = q.year >= 2020 && q.year <= 2025;
      
      const isValid = hasRequiredFields && hasCorrectAnswer && hasEnoughOptions && isValidYear;
      
      if (!isValid && q.id % 50 === 0) { // Log apenas algumas para não spammar
        console.log('❌ Questão inválida:', {
          id: q.id,
          year: q.year,
          area: q.area,
          hasCorrect: !!q.correct,
          correctValue: q.correct
        });
      }
      
      return isValid;
    });

    console.log('✅ Questões válidas encontradas:', validQuestions.length);
    console.log('📊 Anos disponíveis:', [...new Set(validQuestions.map(q => q.year))].sort());
    console.log('📊 Áreas disponíveis:', [...new Set(validQuestions.map(q => q.area))]);

    // BULLETPROOF: Se não temos questões suficientes, relaxar critérios
    if (validQuestions.length < questionsCount) {
      console.warn('⚠️ Questões insuficientes com critérios rigorosos! Relaxando...');
      
      // Pegar TODAS as questões com pelo menos resposta correta, independente do ano
      const fallbackQuestions = todasQuestoes.filter(q => {
        return q.correct && q.correct.trim() !== '' && q.options && q.options.length >= 4 && q.enunciado;
      });
      
      console.log('🔄 Fallback: questões encontradas:', fallbackQuestions.length);
      
      if (fallbackQuestions.length < questionsCount) {
        console.error('💥 ERRO CRÍTICO: Sistema não possui questões suficientes!');
        console.error('Questões com respostas:', fallbackQuestions.length, 'Necessárias:', questionsCount);
        return [];
      }
      
      // Usar questões de fallback embaralhadas
      const shuffled = [...fallbackQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, questionsCount);
      console.log('🎯 FALLBACK: Selecionadas', selected.length, 'questões');
      return selected;
    }

    // BULLETPROOF: Balanceamento inteligente por área médica
    const areaGroups: Record<string, Question[]> = {};
    validQuestions.forEach(q => {
      if (!areaGroups[q.area]) areaGroups[q.area] = [];
      areaGroups[q.area].push(q);
    });

    const selectedQuestions: Question[] = [];
    const areas = Object.keys(areaGroups);
    
    console.log('🎯 Balanceando por áreas:', areas.length, 'áreas disponíveis');
    
    // Distribuir questões equilibradamente entre áreas
    for (let i = 0; i < questionsCount && areas.length > 0; i++) {
      const areaIndex = i % areas.length;
      const area = areas[areaIndex];
      const areaQuestions = areaGroups[area];
      
      if (areaQuestions && areaQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * areaQuestions.length);
        const selectedQuestion = areaQuestions.splice(randomIndex, 1)[0];
        selectedQuestions.push(selectedQuestion);
        console.log(`✅ Q${i + 1}: ${area} (${selectedQuestion.year}) - Resposta: ${selectedQuestion.correct}`);
        
        // Remover área se esgotou
        if (areaQuestions.length === 0) {
          delete areaGroups[area];
          const areaIndexToRemove = areas.indexOf(area);
          if (areaIndexToRemove > -1) {
            areas.splice(areaIndexToRemove, 1);
          }
        }
      }
    }
    
    // Se ainda faltam questões, pegar de qualquer área restante
    while (selectedQuestions.length < questionsCount) {
      const remainingQuestions = Object.values(areaGroups).flat();
      if (remainingQuestions.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const question = remainingQuestions[randomIndex];
      
      // Remover da área original
      const questionArea = question.area;
      if (areaGroups[questionArea]) {
        areaGroups[questionArea] = areaGroups[questionArea].filter(q => q.id !== question.id);
        if (areaGroups[questionArea].length === 0) {
          delete areaGroups[questionArea];
        }
      }
      
      selectedQuestions.push(question);
      console.log(`➕ Q${selectedQuestions.length}: ${questionArea} (extra) - Resposta: ${question.correct}`);
    }

    console.log('🎉 SUCESSO BULLETPROOF! Questões selecionadas:', selectedQuestions.length);
    console.log('📋 Resumo final:', selectedQuestions.map(q => `Q${q.id}(${q.year})-${q.correct}`));
    
    return selectedQuestions.slice(0, questionsCount);
  }, [todasQuestoes, questionsCount]);

  const startChallenge = useCallback(() => {
    console.log('=== 🚀 INICIANDO DESAFIO SUPREMO BULLETPROOF ===');
    
    if (attemptsUsed >= maxAttempts) {
      console.log('❌ Limite de tentativas atingido');
      return false;
    }

    const selectedQuestions = getOfficialQuestions();
    
    if (selectedQuestions.length < questionsCount) {
      console.log('❌ FALHA CRÍTICA: Questões insuficientes:', selectedQuestions.length);
      toast.error("Sistema temporariamente indisponível. Tente novamente em alguns minutos.", {
        duration: 4000,
        className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
      });
      return false;
    }

    console.log('✅ SUCESSO! Questões carregadas:', selectedQuestions.length);
    console.log('📋 Áreas das questões:', [...new Set(selectedQuestions.map(q => q.area))]);
    console.log('📅 Anos das questões:', [...new Set(selectedQuestions.map(q => q.year))].sort());

    const newState: ChallengeState = {
      isActive: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: selectedQuestions,
      hasCompleted: false,
      hasWon: false,
      streak: 0,
      combo: 0,
      timeBonus: 0,
      coinsEarned: 0,
      perfectAnswers: 0
    };

    setChallengeState(newState);
    return true;
  }, [getOfficialQuestions, attemptsUsed, maxAttempts, questionsCount]);

  const answerCurrentQuestion = useCallback((optionId: string) => {
    console.log('=== 📝 RESPONDENDO QUESTÃO ===');
    
    setChallengeState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) {
        console.error('❌ Questão atual não encontrada');
        return prev;
      }

      const isCorrect = currentQuestion.correct === optionId;
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newCombo = isCorrect ? prev.combo + 1 : 0;
      const newPerfectAnswers = isCorrect ? prev.perfectAnswers + 1 : prev.perfectAnswers;

      console.log('📊 Resultado da resposta:', { 
        questao: currentQuestion.id,
        resposta: optionId,
        correta: currentQuestion.correct,
        isCorrect, 
        newScore, 
        newStreak, 
        newCombo 
      });

      // Sistema de moedas baseado na performance
      let coinsEarned = 0;
      if (isCorrect) {
        coinsEarned = 10; // Base
        if (newCombo >= 3) coinsEarned += 5; // Combo bonus
        if (newStreak >= 5) coinsEarned += 10; // Streak bonus
        if (prev.currentQuestionIndex < 5) coinsEarned += 5; // Speed bonus
        console.log('💰 Moedas ganhas nesta questão:', coinsEarned);
      }

      // Registrar resposta no sistema de gamificação
      recordAnswer(isCorrect, currentQuestion.area, currentQuestion.id);

      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestion.id]: optionId },
        score: newScore,
        streak: newStreak,
        combo: newCombo,
        perfectAnswers: newPerfectAnswers,
        coinsEarned: prev.coinsEarned + coinsEarned
      };
    });
  }, [recordAnswer]);

  const nextQuestion = useCallback(() => {
    setChallengeState(prev => {
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;
      
      if (isLastQuestion) {
        const hasWon = prev.score >= winThreshold;
        const newAttemptsUsed = attemptsUsed + 1;
        
        console.log('🏁 DESAFIO FINALIZADO!', { 
          score: prev.score, 
          total: prev.questions.length,
          hasWon,
          winThreshold 
        });
        
        setAttemptsUsed(newAttemptsUsed);
        localStorage.setItem('premium_challenge_attempts', newAttemptsUsed.toString());
        
        if (hasWon) {
          localStorage.setItem('premium_challenge_won', 'true');
          // XP épico para vitória perfeita
          const bonusXP = 1000 + (prev.perfectAnswers * 100) + prev.coinsEarned;
          addXP(bonusXP);
          
          toast.success("🏆 PARABÉNS! DESAFIO CONQUISTADO! Desconto Premium desbloqueado!", {
            duration: 6000,
            className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
          });
          
          console.log('🎉 VITÓRIA! XP bonus concedido:', bonusXP);
        } else {
          const consolationXP = prev.score * 50 + prev.coinsEarned;
          addXP(consolationXP);
          
          toast.info(`💪 Quase lá! Você acertou ${prev.score}/${prev.questions.length}. Tente novamente!`, {
            duration: 4000,
            className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
          });
          
          console.log('💪 Consolação: XP concedido:', consolationXP);
        }

        return {
          ...prev,
          isActive: false,
          hasCompleted: true,
          hasWon
        };
      }

      console.log('➡️ Próxima questão:', prev.currentQuestionIndex + 1);
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [attemptsUsed, winThreshold, addXP]);

  const resetChallenge = useCallback(() => {
    console.log('🔄 Resetando desafio...');
    setChallengeState({
      isActive: false,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      questions: [],
      hasCompleted: false,
      hasWon: false,
      streak: 0,
      combo: 0,
      timeBonus: 0,
      coinsEarned: 0,
      perfectAnswers: 0
    });
  }, []);

  const canStartChallenge = attemptsUsed < maxAttempts;
  const attemptsLeft = maxAttempts - attemptsUsed;
  const hasWonBefore = localStorage.getItem('premium_challenge_won') === 'true';

  const resetAttempts = useCallback(() => {
    console.log('🔄 RESETANDO tentativas (modo debug)');
    localStorage.removeItem('premium_challenge_attempts');
    localStorage.removeItem('premium_challenge_won');
    setAttemptsUsed(0);
  }, []);

  return {
    challengeState,
    canStartChallenge,
    attemptsUsed,
    attemptsLeft,
    maxAttempts,
    hasWonBefore,
    winThreshold,
    startChallenge,
    answerCurrentQuestion,
    nextQuestion,
    resetChallenge,
    resetAttempts
  };
}