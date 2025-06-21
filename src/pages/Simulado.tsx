
import { useState, useEffect } from "react";
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { useQuestions } from "@/hooks/useQuestions";
import { FloatingTimer } from "@/components/FloatingTimer";
import { SimuladoProgress } from "@/components/SimuladoProgress";
import { SimuladoFilters } from "@/components/SimuladoFilters";
import { QuestionCard } from "@/components/QuestionCard";
import { Navbar } from "@/components/Navbar";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { AchievementNotification } from "@/components/AchievementNotification";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { Trophy, Clock, Target, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Simulado() {
  const [configuracao, setConfiguracao] = useState<SimuladoConfig | null>(null);
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [questaoRespondida, setQuestaoRespondida] = useState(false);
  
  const { questoesAnoSelecionado } = useQuestions();
  const simulado = useSimulado(questoesAnoSelecionado, configuracao || undefined);
  const { 
    completeSimulado, 
    userProgress, 
    getNewlyUnlockedAchievement, 
    clearNewlyUnlockedAchievement 
  } = useGamification();
  const { playSound } = useAudio();

  // Check for newly unlocked achievements
  const newlyUnlockedAchievement = getNewlyUnlockedAchievement();

  // Track time elapsed
  useEffect(() => {
    if (iniciado && !finalizado && !simulado.terminou && startTime) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [iniciado, finalizado, simulado.terminou, startTime]);

  // Reset questão respondida quando mudar de questão
  useEffect(() => {
    setQuestaoRespondida(!!simulado.respostaAtual());
  }, [simulado.index, simulado.respostaAtual]);

  // Handle achievement notification
  useEffect(() => {
    if (newlyUnlockedAchievement) {
      playSound('achievement');
    }
  }, [newlyUnlockedAchievement, playSound]);

  function handleConfiguracao(config: SimuladoConfig) {
    setConfiguracao(config);
    setIniciado(true);
    setFinalizado(false);
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
    simulado.proxima();
    setQuestaoRespondida(false);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function encerrar() {
    setFinalizado(true);
    
    // Calculate score and update gamification
    const acertos = simulado.questoesSelecionadas.filter(
      (q) => simulado.respostas[q.id] === q.correct
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
    setConfiguracao(null);
    setIniciado(false);
    setFinalizado(false);
    setStartTime(null);
    setTimeElapsed(0);
    setQuestaoRespondida(false);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  // Count answered questions
  const answeredCount = Object.keys(simulado.respostas).length;

  // Verificar se a quantidade de questões condiz com a configuração
  const questoesInsuficientes = configuracao && simulado.total < configuracao.quantidade;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Tela de Configuração */}
          {!configuracao && (
            <div className="pt-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  🚩 Simulado Personalizado
                </h1>
                <p className="text-xl text-muted-foreground">
                  Configure sua quest do jeito que quiser e conquiste XP, badges e cartas médicas!
                </p>
              </div>
              
              <SimuladoFilters onStart={handleConfiguracao} />
            </div>
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
            <div className="pt-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    Quest Concluída! 🎊
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
                    🔄 Nova Quest Personalizada
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tela do Simulado em Andamento */}
          {iniciado && !finalizado && !simulado.terminou && configuracao && (
            <div className="pt-8">
              {/* Header com botão voltar */}
              <div className="mb-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={voltarConfiguracao}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar às Configurações
                </Button>
              </div>

              {/* Progress Component */}
              <SimuladoProgress
                currentIndex={simulado.index}
                totalQuestions={simulado.total}
                timeElapsed={timeElapsed}
                answeredCount={answeredCount}
                config={simulado.config}
              />
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-gray-700">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    <Target className="w-5 h-5" />
                    Questão {simulado.index + 1} de {simulado.total}
                  </div>
                </div>
                
                {simulado.atual && (
                  <div>
                    <QuestionCard
                      question={simulado.atual}
                      showAnswer={questaoRespondida}
                      onAnswer={handleResposta}
                      disabled={questaoRespondida}
                    />
                    
                    {/* Botão Continuar */}
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
                    
                    {/* Opções de resposta quando não respondida */}
                    {!questaoRespondida && (
                      <div className="flex justify-center mt-6 gap-3 flex-wrap">
                        {simulado.atual.options.map(opt => (
                          <button
                            key={opt.id}
                            className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 font-bold text-lg shadow-md hover:shadow-lg"
                            onClick={() => handleResposta(opt.id)}
                          >
                            {opt.id}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Floating Timer */}
              <FloatingTimer
                running={!finalizado && iniciado && !simulado.terminou}
                onFinish={encerrar}
                initialMinutes={configuracao.tempoMinutos}
                currentQuestion={simulado.index + 1}
                totalQuestions={simulado.total}
                onForceFinish={encerrar}
              />
            </div>
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
