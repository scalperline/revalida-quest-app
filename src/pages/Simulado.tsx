
import { useEffect } from "react";
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { useQuestions } from "@/hooks/useQuestions";
import { useSimuladoState } from "@/hooks/useSimuladoState";
import { SimuladoHeader } from "@/components/SimuladoHeader";
import { SimuladoResults } from "@/components/SimuladoResults";
import { SimuladoInProgress } from "@/components/SimuladoInProgress";
import { Navbar } from "@/components/Navbar";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { AchievementNotification } from "@/components/AchievementNotification";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { Button } from "@/components/ui/button";

export default function Simulado() {
  const {
    configuracao,
    iniciado,
    finalizado,
    showLevelUp,
    newLevel,
    showConfetti,
    timeElapsed,
    startTime,
    questaoRespondida,
    setTimeElapsed,
    setQuestaoRespondida,
    setFinalizado,
    setShowLevelUp,
    setNewLevel,
    setShowConfetti,
    resetState,
    initializeSimulado
  } = useSimuladoState();
  
  const { questoesAnoSelecionado } = useQuestions();
  
  // Só chama useSimulado quando há configuração ou quando está na tela inicial
  const simulado = useSimulado(
    questoesAnoSelecionado, 
    configuracao || undefined
  );
  
  const { 
    completeSimulado, 
    userProgress, 
    getNewlyUnlockedAchievement, 
    clearNewlyUnlockedAchievement 
  } = useGamification();
  const { playSound } = useAudio();

  // Check for newly unlocked achievements
  const newlyUnlockedAchievement = getNewlyUnlockedAchievement();

  // Track time elapsed - CORRIGIDO: só atualizar se simulado estiver rodando
  useEffect(() => {
    if (iniciado && !finalizado && !simulado.terminou && startTime) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [iniciado, finalizado, simulado.terminou, startTime, setTimeElapsed]);

  // Reset questão respondida quando mudar de questão
  useEffect(() => {
    console.log('=== EFFECT RESET QUESTAO RESPONDIDA ===');
    console.log('Índice da questão:', simulado.index);
    console.log('ID da questão atual:', simulado.atual?.id);
    console.log('Resposta atual:', simulado.respostaAtual());
    
    const temResposta = !!simulado.respostaAtual();
    setQuestaoRespondida(temResposta);
    
    console.log('questaoRespondida definida como:', temResposta);
    console.log('=== FIM EFFECT ===');
  }, [simulado.index, simulado.atual?.id, setQuestaoRespondida]);

  // Handle achievement notification
  useEffect(() => {
    if (newlyUnlockedAchievement) {
      playSound('achievement');
    }
  }, [newlyUnlockedAchievement, playSound]);

  function handleConfiguracao(config: SimuladoConfig) {
    console.log('=== CONFIGURAÇÃO SENDO DEFINIDA ===');
    console.log('Nova configuração:', config);
    
    // Garante que a configuração seja válida antes de prosseguir
    if (!config.areas || config.areas.length === 0) {
      alert('Selecione pelo menos uma área para continuar!');
      return;
    }
    
    if (!config.quantidade || config.quantidade < 1) {
      alert('Selecione uma quantidade válida de questões!');
      return;
    }
    
    initializeSimulado(config);
    playSound('click');
    
    console.log('Estado após configuração:', {
      configuracao: config,
      iniciado: true,
      finalizado: false
    });
    console.log('=== FIM CONFIGURAÇÃO ===');
  }

  function handleResposta(optionId: string) {
    console.log('=== RESPOSTA SELECIONADA ===');
    console.log('ID da opção:', optionId);
    console.log('ID da questão:', simulado.atual?.id);
    
    playSound('click');
    simulado.responder(optionId);
    setQuestaoRespondida(true);
    
    console.log('questaoRespondida definida como true');
    console.log('=== FIM RESPOSTA ===');
  }

  function handleContinuar() {
    console.log('=== CONTINUANDO PARA PRÓXIMA QUESTÃO ===');
    console.log('Índice atual antes:', simulado.index);
    console.log('Questão atual antes:', simulado.atual?.id);
    
    playSound('click');
    
    // Reset ANTES de ir para próxima questão
    setQuestaoRespondida(false);
    
    // Navegar para próxima
    simulado.proxima();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('questaoRespondida resetada para false');
    console.log('Navegação executada');
    console.log('=== FIM CONTINUAR ===');
  }

  function encerrar() {
    setFinalizado(true);
    
    // Calculate score and update gamification
    const acertos = simulado.questoesSelecionadas.filter(
      (q: any) => simulado.respostas[q.id] === q.correct
    ).length;
    
    const previousLevel = userProgress.level;
    completeSimulado(acertos, simulado.total);
    
    // Trigger celebrations
    setShowConfetti(true);
    
    // Check for level up
    setTimeout(() => {
      if (userProgress.level > previousLevel) {
        setNewLevel(userProgress.level);
        setShowLevelUp(true);
        playSound('levelup');
      }
    }, 500);
    
    // Play completion sound
    if (acertos / simulado.total >= 0.7) {
      playSound('achievement');
    } else {
      playSound('click');
    }
  }

  function voltarConfiguracao() {
    console.log('=== VOLTANDO PARA CONFIGURAÇÃO ===');
    resetState();
    window.scrollTo({top:0,behavior:"smooth"});
    console.log('Estado resetado para configuração');
    console.log('=== FIM VOLTAR ===');
  }

  // Verificar se a quantidade de questões condiz com a configuração
  const questoesInsuficientes = configuracao && simulado.total < configuracao.quantidade;

  // Estado do timer: rodando apenas se iniciado, não finalizado e não terminou
  const timerRunning = iniciado && !finalizado && !simulado.terminou;

  console.log('=== DEBUG GERAL SIMULADO ===');
  console.log('Estado atual:', {
    configuracao: configuracao?.quantidade,
    totalQuestoes: simulado.total,
    questoesSelecionadas: simulado.questoesSelecionadas.length,
    questoesInsuficientes,
    iniciado,
    finalizado,
    questaoRespondida,
    indexAtual: simulado.index,
    questaoAtualId: simulado.atual?.id,
    timerRunning
  });
  console.log('=== FIM DEBUG GERAL ===');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Tela de Configuração */}
          {!configuracao && (
            <SimuladoHeader onStart={handleConfiguracao} />
          )}

          {/* Alerta de questões insuficientes */}
          {questoesInsuficientes && iniciado && !finalizado && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <div className="w-5 h-5 text-yellow-600">⚠️</div>
                <div>
                  <div className="font-semibold">Atenção: Questões limitadas</div>
                  <div className="text-sm">
                    Você configurou {configuracao.quantidade} questões, mas só há {simulado.total} questões disponíveis nas áreas selecionadas.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tela de Resultados */}
          {(finalizado || simulado.terminou) && (
            <SimuladoResults 
              simulado={simulado}
              timeElapsed={timeElapsed}
              onVoltarConfiguracao={voltarConfiguracao}
            />
          )}

          {/* Tela do Simulado em Andamento */}
          {iniciado && !finalizado && !simulado.terminou && configuracao && (
            <SimuladoInProgress
              simulado={simulado}
              configuracao={configuracao}
              questaoRespondida={questaoRespondida}
              timeElapsed={timeElapsed}
              timerRunning={timerRunning}
              onVoltarConfiguracao={voltarConfiguracao}
              onResposta={handleResposta}
              onContinuar={handleContinuar}
              onEncerrar={encerrar}
            />
          )}

          {/* Botão Finalizar quando terminou */}
          {iniciado && !finalizado && simulado.terminou && (
            <div className="text-center mt-12">
              <button
                onClick={encerrar}
                className="px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:via-emerald-700 hover:to-green-800 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🏆 Ver Recompensas
              </button>
            </div>
          )}
        </div>
      </div>
      
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <LevelUpNotification
        show={showLevelUp}
        newLevel={newLevel}
        onClose={() => setShowLevelUp(false)}
      />
      
      <AchievementNotification
        achievement={newlyUnlockedAchievement}
        onClose={clearNewlyUnlockedAchievement}
      />
    </div>
  );
}
