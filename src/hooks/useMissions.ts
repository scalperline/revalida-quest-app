
import { useState, useEffect } from 'react';
import { Mission, MissionProgress } from '@/types/missions';
import { MISSIONS } from '@/data/missions';
import { useGamification } from '@/hooks/useGamification';

// Import all question sets
import { QUESTOES_REVALIDA_2011 } from "@/data/questoesRevalida2011";
import { QUESTOES_REVALIDA_2012 } from "@/data/questoesRevalida2012";
import { QUESTOES_REVALIDA_2013 } from "@/data/questoesRevalida2013";
import { QUESTOES_REVALIDA_2013_VERMELHA } from "@/data/questoesRevalida2013Vermelha";
import { QUESTOES_REVALIDA_2014 } from "@/data/questoesRevalida2014";
import { QUESTOES_REVALIDA_2014_VERMELHA } from "@/data/questoesRevalida2014Vermelha";
import { QUESTOES_REVALIDA_2015 } from "@/data/questoesRevalida2015";
import { QUESTOES_REVALIDA_2015_VERMELHA } from "@/data/questoesRevalida2015Vermelha";
import { QUESTOES_REVALIDA_2016_PROVA1 } from "@/data/questoesRevalida2016Prova1";
import { QUESTOES_REVALIDA_2016_PROVA2 } from "@/data/questoesRevalida2016Prova2";
import { QUESTOES_REVALIDA_2017_PROVA1 } from "@/data/questoesRevalida2017Prova1";
import { QUESTOES_REVALIDA_2017_PROVA2 } from "@/data/questoesRevalida2017Prova2";
import { QUESTOES_REVALIDA_2020 } from "@/data/questoesRevalida2020";
import { QUESTOES_REVALIDA_2021 } from "@/data/questoesRevalida2021";
import { QUESTOES_REVALIDA_2022_1 } from "@/data/questoesRevalida2022_1";
import { QUESTOES_REVALIDA_2022_2 } from "@/data/questoesRevalida2022_2";
import { QUESTOES_REVALIDA_2023_1 } from "@/data/questoesRevalida2023_1";
import { QUESTOES_REVALIDA_2023_2 } from "@/data/questoesRevalida2023_2";
import { QUESTOES_REVALIDA_2024_1 } from "@/data/questoesRevalida2024_1";
import { QUESTOES_REVALIDA_2025_1 } from "@/data/questoesRevalida2025_1";

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [missionProgress, setMissionProgress] = useState<Record<string, MissionProgress>>({});
  const { addXP, unlockAchievement } = useGamification();

  // Combine all questions from all editions
  const allQuestions = [
    ...QUESTOES_REVALIDA_2011,
    ...QUESTOES_REVALIDA_2012,
    ...QUESTOES_REVALIDA_2013,
    ...QUESTOES_REVALIDA_2013_VERMELHA,
    ...QUESTOES_REVALIDA_2014,
    ...QUESTOES_REVALIDA_2014_VERMELHA,
    ...QUESTOES_REVALIDA_2015,
    ...QUESTOES_REVALIDA_2015_VERMELHA,
    ...QUESTOES_REVALIDA_2016_PROVA1,
    ...QUESTOES_REVALIDA_2016_PROVA2,
    ...QUESTOES_REVALIDA_2017_PROVA1,
    ...QUESTOES_REVALIDA_2017_PROVA2,
    ...QUESTOES_REVALIDA_2020,
    ...QUESTOES_REVALIDA_2021,
    ...QUESTOES_REVALIDA_2022_1,
    ...QUESTOES_REVALIDA_2022_2,
    ...QUESTOES_REVALIDA_2023_1,
    ...QUESTOES_REVALIDA_2023_2,
    ...QUESTOES_REVALIDA_2024_1,
    ...QUESTOES_REVALIDA_2025_1,
  ];

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

  const getQuestionsForMission = (mission: Mission) => {
    let questionsForArea;

    if (mission.area === 'Mista') {
      // For mixed missions, use all questions
      questionsForArea = allQuestions;
    } else {
      // Filter questions by area
      questionsForArea = allQuestions.filter(q => q.area === mission.area);
    }

    // Shuffle and take the required amount
    const shuffled = [...questionsForArea].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, mission.targetQuestions);
  };

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

  const getAvailableQuestionsCount = (mission: Mission) => {
    if (mission.area === 'Mista') {
      return allQuestions.length;
    }
    return allQuestions.filter(q => q.area === mission.area).length;
  };

  return {
    missions,
    updateMissionProgress,
    getMissionProgress,
    getAvailableMissions,
    getCompletedMissions,
    getQuestionsForMission,
    getAvailableQuestionsCount,
    allQuestions
  };
}
