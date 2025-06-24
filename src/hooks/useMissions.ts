
import { useState, useEffect } from 'react';
import { Mission, MissionProgress } from '@/types/missions';
import { MISSIONS } from '@/data/missions';
import { useGamification } from '@/hooks/useGamification';

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [missionProgress, setMissionProgress] = useState<Record<string, MissionProgress>>({});
  const { addXP, unlockAchievement } = useGamification();

  useEffect(() => {
    // Carregar progresso das missões do localStorage
    const savedProgress = localStorage.getItem('mission-progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {};
    
    // Atualizar missões com progresso salvo
    const updatedMissions = MISSIONS.map(mission => {
      const missionProg = progress[mission.id];
      if (missionProg) {
        return {
          ...mission,
          progress: missionProg.questionsAnswered,
          completed: missionProg.completed
        };
      }
      return mission;
    });
    
    setMissions(updatedMissions);
    setMissionProgress(progress);
  }, []);

  const updateMissionProgress = (missionId: string, questionsAnswered: number, correctAnswers: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;
    const isCompleted = questionsAnswered >= mission.targetQuestions && accuracy >= mission.targetAccuracy;

    const newProgress: MissionProgress = {
      missionId,
      questionsAnswered,
      correctAnswers,
      completed: isCompleted,
      completedAt: isCompleted ? new Date() : undefined
    };

    // Atualizar progresso
    const updatedProgress = {
      ...missionProgress,
      [missionId]: newProgress
    };

    setMissionProgress(updatedProgress);
    localStorage.setItem('mission-progress', JSON.stringify(updatedProgress));

    // Atualizar missão
    setMissions(prev => prev.map(m => 
      m.id === missionId 
        ? { ...m, progress: questionsAnswered, completed: isCompleted }
        : m
    ));

    // Se completou a missão, dar recompensas
    if (isCompleted && !mission.completed) {
      addXP(mission.reward.xp);
      if (mission.reward.badge) {
        // Aqui você pode implementar o sistema de badges
        console.log(`Badge desbloqueado: ${mission.reward.badge}`);
      }
    }

    return isCompleted;
  };

  const getMissionProgress = (missionId: string) => {
    return missionProgress[missionId];
  };

  const getAvailableMissions = () => {
    return missions.filter(m => !m.completed);
  };

  const getCompletedMissions = () => {
    return missions.filter(m => m.completed);
  };

  return {
    missions,
    updateMissionProgress,
    getMissionProgress,
    getAvailableMissions,
    getCompletedMissions
  };
}
