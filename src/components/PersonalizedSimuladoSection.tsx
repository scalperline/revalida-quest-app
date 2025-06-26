
import { useState, useEffect } from 'react';
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { useQuestions } from "@/hooks/useQuestions";
import { QuestionCard } from "@/components/QuestionCard";
import { FloatingTimer } from "@/components/FloatingTimer";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Trophy, Target } from 'lucide-react';

interface PersonalizedSimuladoSectionProps {
  onBackToTabs: () => void;
}

export function PersonalizedSimuladoSection({ onBackToTabs }: PersonalizedSimuladoSectionProps) {
  const [configuracao, setConfiguracao] = useState<SimuladoConfig | null>(null);
  const [questIniciada, setQuestIniciada] = useState(false);
  const [questFinalizada, setQuestFinalizada] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questaoRespondida, setQuestaoRespondida] = useState(false);
  
  const { questoesAnoSelecionado } = useQuestions();
  
  const simulado = useSimulado(
    questoesAnoSelecionado, 
    configuracao || undefined
  );
  
  const { 
    completeSimulado, 
    userProgress
  } = useGamification();
  const { playSound } = useAudio();

  // Track time elapsed
  useEffect(() => {
    if (questIniciada && !questFinalizada && !simulado.terminou && startTime) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [questIniciada, questFinalizada, simulado.terminou, startTime]);

  // Reset questão respondida quando mudar de questão
  useEffect(() => {
    const temResposta = !!simulado.respostaAtual();
    setQuestaoRespondida(temResposta);
  }, [simulado.index, simulado.atual?.id]);

  function handleConfiguracaoSimuladoPersonalizado(config: SimuladoConfig) {
    if (!config.areas || config.areas.length === 0) {
      alert('Selecione pelo menos uma área para continuar!');
      return;
    }
    
    if (!config.quantidade || config.quantidade < 1) {
      alert('Selecione uma quantidade válida de questões!');
      return;
    }
    
    setConfiguracao(config);
    setQuestIniciada(true);
    setQuestFinalizada(false);
    setStartTime(Date.now());
    setTimeElapsed(0);
    setQuestaoRespondida(false);
    playSound('click');
  }

  function handleResposta(optionId: string) {
    playSound('click');
    simulado.responder(optionId);
    setQuestaoRespondida(true);
  }

  function handleContinuar() {
    playSound('click');
    setQuestaoRespondida(false);
    simulado.proxima();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function encerrarSimuladoPersonalizado() {
    setQuestFinalizada(true);
    
    const acertos = simulado.questoesSelecionadas.filter(
      (q) => simulado.respostas[q.id] === q.correct
    ).length;
    
    const previousLevel = userProgress.level;
    completeSimulado(acertos, simulado.total);
    
    setShowConfetti(true);
    
    setTimeout(() => {
      if (userProgress.level > previousLevel) {
        setNewLevel(userProgress.level);
        setShowLevelUp(true);
        playSound('levelup');
      }
    }, 500);
    
    if (acertos / simulado.total >= 0.7) {
      playSound('achievement');
    } else {
      playSound('click');
    }
  }

  function voltarConfiguracao() {
    setConfiguracao(null);
    setQuestIniciada(false);
    setQuestFinalizada(false);
    setStartTime(null);
    setTimeElapsed(0);
    setQuestaoRespondida(false);
    window.scrollTo({top: 0, behavior: "smooth"});
    onBackToTabs();
  }

  // Verificar se a quantidade de questões condiz com a configuração
  const questoesInsuficientes = configuracao && simulado.total < configuracao.quantidade;
  const timerRunning = questIniciada && !questFinalizada && !simulado.terminou;

  // Results screen
  if (questFinalizada || (questIniciada && simulado.terminou)) {
    return (
      <div className="pt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-blue-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Simulado Concluído! 🎊
            </h2>
            
            <div className="text-3xl font-bold text-green-600 mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm">
              🎯 Você conquistou {simulado.questoesSelecionadas.filter(
                (q) => simulado.respostas[q.id] === q.correct
              ).length} de {simulado.total} questões!
            </div>
            
            {/* Resumo da Performance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  +{Math.floor((simulado.questoesSelecionadas.filter(q => simulado.respostas[q.id] === q.correct).length / simulado.total) * (simulado.config.quantidade * 2.5))} XP
                </div>
                <div className="text-blue-600 dark:text-blue-500">Experiência Ganha</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700 shadow-sm">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {simulado.config.areas.length}
                </div>
                <div className="text-purple-600 dark:text-purple-500">Áreas Estudadas</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700 shadow-sm">
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {Math.floor(timeElapsed / 60)}min
                </div>
                <div className="text-green-600 dark:text-green-500">Tempo Utilizado</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700 shadow-sm">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {Math.round(timeElapsed / simulado.total)}s
                </div>
                <div className="text-orange-600 dark:text-orange-500">Média por Questão</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            {simulado.questoesSelecionadas.map(q => (
              <QuestionCard key={q.id} question={q} showAnswer />
            ))}
          </div>
          
          <div className="text-center space-y-4">
            <Button
              onClick={voltarConfiguracao}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🔄 Novo Simulado Personalizado
            </Button>
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
      </div>
    );
  }

  // In progress screen
  if (questIniciada && !questFinalizada && !simulado.terminou && configuracao) {
    return (
      <div className="pt-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={voltarConfiguracao}
            className="flex items-center gap-2 border-2 border-blue-300 hover:border-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar às Configurações
          </Button>
        </div>
        
        {/* Alerta de questões insuficientes */}
        {questoesInsuficientes && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-800 rounded-xl shadow-lg">
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
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border-2 border-blue-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-white">
              <Target className="w-5 h-5" />
              Questão {simulado.index + 1} de {simulado.total}
            </div>
          </div>
          
          {simulado.atual && (
            <div>
              <QuestionCard
                key={`${simulado.atual.id}-${simulado.index}`}
                question={simulado.atual}
                showAnswer={questaoRespondida}
                onAnswer={handleResposta}
                disabled={questaoRespondida}
              />
              
              {questaoRespondida && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleContinuar}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <FloatingTimer
          running={timerRunning}
          onFinish={encerrarSimuladoPersonalizado}
          initialMinutes={configuracao.tempoMinutos}
          currentQuestion={simulado.index + 1}
          totalQuestions={simulado.total}
          onForceFinish={encerrarSimuladoPersonalizado}
          timeElapsed={timeElapsed}
        />
      </div>
    );
  }

  // Finish button when completed
  if (questIniciada && !questFinalizada && simulado.terminou) {
    return (
      <div className="text-center mt-12">
        <button
          onClick={encerrarSimuladoPersonalizado}
          className="px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:via-emerald-700 hover:to-green-800 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-green-400"
        >
          🏆 Ver Recompensas
        </button>
      </div>
    );
  }

  return null;
}
