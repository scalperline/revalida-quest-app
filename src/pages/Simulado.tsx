
import { useState } from "react";
import { useSimulado } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { QuestionCard } from "@/components/QuestionCard";
import { Navbar } from "@/components/Navbar";
import { GamifiedHeader } from "@/components/GamifiedHeader";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { AchievementNotification } from "@/components/AchievementNotification";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { Trophy, Clock, Target, Zap } from "lucide-react";

// Usando o mesmo banco fictício
const QUESTOES = [
  {
    id: 1,
    year: 2022,
    area: "Clínica Médica",
    enunciado: `Paciente, 28 anos, apresenta febre, tosse produtiva há 3 dias. Ao exame, crepitações no pulmão direito. Assinale a alternativa correta sobre a conduta inicial:`,
    options: [
      { id: "A", text: "Observar em casa e prescrever antitérmico apenas." },
      { id: "B", text: "Internar e iniciar antibiótico endovenoso." },
      { id: "C", text: "Solicitar radiografia de tórax e prescrever antibiótico oral." },
      { id: "D", text: "Prescrever antiviral para influenza e liberar." }
    ],
    correct: "C",
    referencia: "Manual de Pneumonia INEP 2022"
  },
  {
    id: 2,
    year: 2021,
    area: "Pediatria",
    enunciado: `Criança de 2 anos, com desidratação grave. Qual a conduta prioritária?`,
    options: [
      { id: "A", text: "Indicação de antibióticos sem hidratação." },
      { id: "B", text: "Reposição oral com soro caseiro." },
      { id: "C", text: "Reposição venosa com solução isotônica." },
      { id: "D", text: "Alta para cuidados domiciliares." }
    ],
    correct: "C",
    referencia: "Manual de Reidratação INEP 2021"
  }
];

export default function Simulado() {
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [achievementToShow, setAchievementToShow] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const simulado = useSimulado(QUESTOES, 2);
  const { completeSimulado, userProgress } = useGamification();
  const { playSound } = useAudio();

  function iniciar() {
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
    
    // Check for achievements
    setTimeout(() => {
      const newlyUnlocked = userProgress.achievements.find(a => {
        if (!a.unlocked || !a.unlockedAt) return false;
        const timeDiff = Date.now() - (a.unlockedAt instanceof Date ? a.unlockedAt.getTime() : new Date(a.unlockedAt).getTime());
        return timeDiff < 2000;
      });
      
      if (newlyUnlocked) {
        playSound('achievement');
        setAchievementToShow(newlyUnlocked);
      }
    }, 1000);
    
    // Play completion sound
    if (acertos / simulado.total >= 0.7) {
      playSound('achievement');
    } else {
      playSound('click');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <GamifiedHeader />
          
          {!iniciado && (
            <div className="pt-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Missão Épica: Simulado Revalida! 🎯
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    Prepare-se para uma aventura intelectual! Complete este desafio cronometrado 
                    para ganhar XP, desbloquear conquistas e subir de nível na sua jornada rumo à aprovação.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">+50 XP</div>
                      <div className="text-sm text-green-600">Por completar</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700">2 min</div>
                      <div className="text-sm text-blue-600">Cronometrado</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-700">Bônus</div>
                      <div className="text-sm text-purple-600">Por precisão</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={iniciar}
                    className="px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                  >
                    🚀 Iniciar Missão Épica
                  </button>
                </div>
              </div>
            </div>
          )}

          {(finalizado || simulado.terminou) && (
            <div className="pt-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Missão Concluída! 🎊
                  </h2>
                  
                  <div className="text-3xl font-bold text-green-600 mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    🎯 Você conquistou {simulado.questoesSelecionadas.filter(
                      (q) => simulado.respostas[q.id] === q.correct
                    ).length} de {simulado.total} questões!
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">+{Math.floor((simulado.questoesSelecionadas.filter(q => simulado.respostas[q.id] === q.correct).length / simulado.total) * 50) + 25} XP</div>
                      <div className="text-blue-600">Experiência Ganha</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700">Nível {userProgress.level}</div>
                      <div className="text-purple-600">Rank Atual</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  {simulado.questoesSelecionadas.map(q => (
                    <QuestionCard key={q.id} question={q} showAnswer />
                  ))}
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => {
                      setIniciado(false); 
                      setFinalizado(false);
                      window.scrollTo({top:0,behavior:"smooth"});
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    🔄 Nova Missão
                  </button>
                </div>
              </div>
            </div>
          )}

          {iniciado && !finalizado && !simulado.terminou && (
            <div className="pt-8">
              <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-blue-100 dark:border-gray-700">
                <SimuladoTimer
                  running={!finalizado && iniciado && !simulado.terminou}
                  onFinish={encerrar}
                  initialMinutes={2}
                />
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-gray-700">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg">
                    <Target className="w-5 h-5" />
                    Quest {simulado.index + 1} de {simulado.total}
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
                            className="px-8 py-4 bg-gray-50 hover:bg-blue-50 dark:bg-gray-700 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500 font-bold text-lg shadow-md hover:shadow-lg"
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
        achievement={achievementToShow}
        onClose={() => setAchievementToShow(null)}
      />
    </div>
  );
}
