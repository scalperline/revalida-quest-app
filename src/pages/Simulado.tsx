import { useState, useEffect } from "react";
import { useSimulado, type SimuladoConfig } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { useQuestions } from "@/hooks/useQuestions";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { SimuladoFilters } from "@/components/SimuladoFilters";
import { QuestionCard } from "@/components/QuestionCard";
import { Navbar } from "@/components/Navbar";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { AchievementNotification } from "@/components/AchievementNotification";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { Trophy, Clock, Target, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Simulado() {
  const [configuracao, setConfiguracao] = useState<SimuladoConfig | null>(null);
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
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
    playSound('click');
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
    window.scrollTo({top:0,behavior:"smooth"});
  }

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
                  🎯 Simulado Personalizado Revalida
                </h1>
                <p className="text-xl text-muted-foreground">
                  Configure sua quest do jeito que quiser e conquiste XP, badges e cartas médicas!
                </p>
              </div>
              
              <SimuladoFilters onStart={handleConfiguracao} />
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
                  
                  {/* Resumo da Configuração */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                        {simulado.config.tempoMinutos}min
                      </div>
                      <div className="text-green-600 dark:text-green-500">Tempo Configurado</div>
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
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {configuracao.areas.length > 1 ? 
                      `${configuracao.areas.length} áreas selecionadas` : 
                      configuracao.areas[0]
                    }
                  </div>
                </div>
              </div>

              <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-blue-100 dark:border-gray-700">
                <SimuladoTimer
                  running={!finalizado && iniciado && !simulado.terminou}
                  onFinish={encerrar}
                  initialMinutes={configuracao.tempoMinutos}
                />
              </div>
              
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
                      showAnswer={!!simulado.respostaAtual()}
                    />
                    {!simulado.respostaAtual() && (
                      <div className="flex justify-center mt-6 gap-3 flex-wrap">
                        {simulado.atual.options.map(opt => (
                          <button
                            key={opt.id}
                            className="px-8 py-4 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 font-bold text-lg shadow-md hover:shadow-lg"
                            onClick={() => {
                              playSound('click');
                              simulado.responder(opt.id);
                              setTimeout(() => simulado.proxima(), 650);
                            }}
                            disabled={!!simulado.respostaAtual()}
                          >
                            {opt.id}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
