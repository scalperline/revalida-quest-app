
import { useMemo } from 'react';
import { useGamification } from './useGamification';

interface MotivationalMessage {
  id: string;
  message: string;
  type: 'level' | 'area' | 'streak' | 'general';
  icon: string;
  priority: number; // Higher number = higher priority
}

export function useMotivationalMessages() {
  const { userProgress } = useGamification();

  const messages = useMemo(() => {
    const messageList: MotivationalMessage[] = [];

    // Mensagens de nível (alta prioridade)
    const questionsToNextLevel = Math.ceil((userProgress.xpToNextLevel - userProgress.xp) / 10);
    if (questionsToNextLevel <= 10 && questionsToNextLevel > 0) {
      messageList.push({
        id: 'level-progress',
        message: `Você está a apenas ${questionsToNextLevel} questões de subir para o Nível ${userProgress.level + 1}! 🚀`,
        type: 'level',
        icon: '🎯',
        priority: 90
      });
    }

    // Mensagens sobre áreas fracas (prioridade média-alta)
    const weakestAreas = Object.entries(userProgress.areaStats)
      .filter(([_, stats]) => stats.total >= 5)
      .map(([area, stats]) => ({
        area,
        accuracy: Math.round((stats.correct / stats.total) * 100),
        total: stats.total,
        incorrect: stats.total - stats.correct
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2);

    if (weakestAreas.length > 0) {
      const weakestArea = weakestAreas[0];
      if (weakestArea.accuracy < 70) {
        messageList.push({
          id: 'weak-area',
          message: `Hoje é um ótimo dia para revisar ${weakestArea.area} — você errou ${weakestArea.incorrect} questões nessa área. 📚`,
          type: 'area',
          icon: '📖',
          priority: 80
        });
      }
    }

    // Mensagens de streak (prioridade média)
    if (userProgress.streakDias === 0) {
      messageList.push({
        id: 'start-streak',
        message: 'Comece seu streak hoje! Responda pelo menos 1 questão para começar sua jornada. 🔥',
        type: 'streak',
        icon: '⚡',
        priority: 70
      });
    } else if (userProgress.streakDias >= 7) {
      messageList.push({
        id: 'maintain-streak',
        message: `Incrível! Você mantém um streak de ${userProgress.streakDias} dias. Continue assim! 🔥`,
        type: 'streak',
        icon: '🔥',
        priority: 60
      });
    }

    // Mensagens baseadas em atividade recente (prioridade baixa-média)
    const totalQuestions = userProgress.totalQuestions;
    if (totalQuestions === 0) {
      messageList.push({
        id: 'first-question',
        message: 'Bem-vindo ao Revalida Quest! Que tal começar com sua primeira questão? 🎉',
        type: 'general',
        icon: '🚀',
        priority: 85
      });
    } else if (totalQuestions < 10) {
      messageList.push({
        id: 'keep-going',
        message: `Você já respondeu ${totalQuestions} questões. Que tal chegar a 10 hoje? 💪`,
        type: 'general',
        icon: '💪',
        priority: 65
      });
    }

    // Mensagens de conquistas recentes (alta prioridade)
    const unlockedAchievements = userProgress.achievements.filter(a => a.unlocked).length;
    const totalAchievements = userProgress.achievements.length;
    
    if (unlockedAchievements > 0 && unlockedAchievements < totalAchievements) {
      const remaining = totalAchievements - unlockedAchievements;
      messageList.push({
        id: 'achievements',
        message: `Você já desbloqueou ${unlockedAchievements} conquistas! Faltam ${remaining} para completar todas. 🏆`,
        type: 'general',
        icon: '🏆',
        priority: 75
      });
    }

    // Mensagens motivacionais gerais (baixa prioridade)
    const accuracy = userProgress.totalQuestions > 0 
      ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100)
      : 0;

    if (accuracy >= 80 && userProgress.totalQuestions >= 10) {
      messageList.push({
        id: 'high-accuracy',
        message: `Excelente! Você tem ${accuracy}% de aproveitamento. Continue assim, futuro médico! 👨‍⚕️`,
        type: 'general',
        icon: '🎖️',
        priority: 55
      });
    } else if (accuracy >= 60 && accuracy < 80 && userProgress.totalQuestions >= 10) {
      messageList.push({
        id: 'good-progress',
        message: `Você está no caminho certo com ${accuracy}% de acertos. Vamos buscar os 80%! 📈`,
        type: 'general',
        icon: '📈',
        priority: 50
      });
    }

    // Retorna a mensagem com maior prioridade
    return messageList.sort((a, b) => b.priority - a.priority);
  }, [userProgress]);

  return {
    messages,
    topMessage: messages[0] || null
  };
}
