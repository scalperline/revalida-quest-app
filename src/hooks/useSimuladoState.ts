
import { useState } from 'react';
import { SimuladoConfig } from '@/hooks/useSimulado';

export function useSimuladoState() {
  const [configuracao, setConfiguracao] = useState<SimuladoConfig | null>(null);
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questaoRespondida, setQuestaoRespondida] = useState(false);

  const resetState = () => {
    setConfiguracao(null);
    setIniciado(false);
    setFinalizado(false);
    setStartTime(null);
    setTimeElapsed(0);
    setQuestaoRespondida(false);
    setShowLevelUp(false);
    setShowConfetti(false);
  };

  const startSimulado = (config: SimuladoConfig) => {
    setConfiguracao(config);
    setIniciado(true);
    setFinalizado(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setQuestaoRespondida(false);
  };

  return {
    // State
    configuracao,
    iniciado,
    finalizado,
    showLevelUp,
    newLevel,
    showConfetti,
    timeElapsed,
    startTime,
    questaoRespondida,
    
    // Setters
    setConfiguracao,
    setIniciado,
    setFinalizado,
    setShowLevelUp,
    setNewLevel,
    setShowConfetti,
    setTimeElapsed,
    setStartTime,
    setQuestaoRespondida,
    
    // Actions
    resetState,
    startSimulado,
  };
}
