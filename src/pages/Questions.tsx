
import { useState, useEffect } from "react";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { CircularXPProgress } from "@/components/CircularXPProgress";
import { FloatingXPNotification } from "@/components/FloatingXPNotification";
import { LevelUpAlert } from "@/components/LevelUpAlert";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { useAudio } from "@/hooks/useAudio";
import { useXPAnimation } from "@/hooks/useXPAnimation";
import { useKeyboardDemo } from "@/hooks/useKeyboardDemo";
import { useGamification } from "@/hooks/useGamification";
import { getDefaultTipoProva } from "@/utils/questionSelector";
import { initializeDemoProgress } from "@/utils/gamificationHelpers";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);
  const [tipoProva, setTipoProva] = useState<string | null>(getDefaultTipoProva(2025));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Initialize demo XP state
  const [demoXP, setDemoXP] = useState(250);

  const { playSound } = useAudio();
  const { userProgress, addXP } = useGamification();
  const { 
    xpNotification, 
    levelUpNotification, 
    showXPGain, 
    hideLevelUpNotification 
  } = useXPAnimation();

  // Initialize demo progress on mount
  useEffect(() => {
    const demoProgress = initializeDemoProgress();
    setDemoXP(demoProgress.xp);
  }, []);

  // Test XP gain with keyboard
  const handleTestXP = () => {
    const gainAmount = 10;
    const oldXP = demoXP;
    const newXP = demoXP + gainAmount;
    setDemoXP(newXP);
    showXPGain(gainAmount, oldXP, newXP);
    console.log(`Test XP: +${gainAmount} (${oldXP} → ${newXP})`);
  };

  useKeyboardDemo({ onTestXP: handleTestXP });

  const {
    filteredQuestions,
    totalQuestions,
    questionsPerPage,
  } = useQuestionsFilters({
    ano: anoSelecionado,
    tipo: tipoProva,
    searchTerm,
    area: selectedArea,
    difficulty: selectedDifficulty,
    page: currentPage,
  });

  const handleAnoChange = (ano: number) => {
    setAnoSelecionado(ano);
    setCurrentPage(1);
    // Set appropriate default tipo for the selected year
    const defaultTipo = getDefaultTipoProva(ano);
    setTipoProva(defaultTipo);
  };

  const handleTipoChange = (tipo: string) => {
    setTipoProva(tipo);
    setCurrentPage(1);
  };

  const handleQuestionAnswer = (questionId: number, optionId: string, correct: boolean) => {
    playSound(correct ? 'correct' : 'incorrect');
    
    if (correct) {
      setShowConfetti(true);
    }
  };

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        {/* Circular XP Progress (Mobile Top Right) */}
        <div className="fixed top-4 right-4 z-40 md:hidden">
          <CircularXPProgress xp={demoXP} size={70} strokeWidth={5} />
        </div>

        <div className="relative z-10 responsive-container responsive-padding pb-8">
          <div className="pt-6 sm:pt-8 space-y-6 sm:space-y-8">
            <GamifiedQuestionsHeader
              anoSelecionado={anoSelecionado}
              setAnoSelecionado={handleAnoChange}
              totalQuestoes={totalQuestions}
              tipoProva={tipoProva || undefined}
              setTipoProva={handleTipoChange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />

            <div className="space-y-6 sm:space-y-8">
              {filteredQuestions.map((question) => (
                <QuestionCard 
                  key={question.id} 
                  question={question}
                  onAnswerWithEffects={(optionId: string, correct: boolean) => {
                    handleQuestionAnswer(question.id, optionId, correct);
                  }}
                />
              ))}
            </div>

            <div className="mt-8 sm:mt-12">
              <QuestionsPagination
                paginaAtual={currentPage}
                totalPaginas={Math.ceil(totalQuestions / questionsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>

        <ConfettiAnimation 
          trigger={showConfetti} 
          onComplete={() => setShowConfetti(false)} 
        />

        {/* Floating XP Notification */}
        <FloatingXPNotification 
          show={xpNotification.show}
          amount={xpNotification.amount}
        />

        {/* Level Up Alert */}
        <LevelUpAlert
          show={levelUpNotification.show}
          newLevel={levelUpNotification.newLevel}
          onClose={hideLevelUpNotification}
        />
      </div>
    </ResponsiveLayout>
  );
}
