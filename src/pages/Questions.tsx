
import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { MobileProgressDrawer } from "@/components/MobileProgressDrawer";
import { XPPillAnimation } from "@/components/XPPillAnimation";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { useAudio } from "@/hooks/useAudio";
import { useXPPillAnimation } from "@/hooks/useXPPillAnimation";
import { getDefaultTipoProva } from "@/utils/questionSelector";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);
  const [tipoProva, setTipoProva] = useState<string | null>(getDefaultTipoProva(2025));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [showConfetti, setShowConfetti] = useState(false);
  const [drawerXPReceived, setDrawerXPReceived] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useAudio();
  const {
    isAnimating,
    xpAmount,
    startPosition,
    endPosition,
    triggerXPAnimation,
    resetAnimation
  } = useXPPillAnimation();

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
    const defaultTipo = getDefaultTipoProva(ano);
    setTipoProva(defaultTipo);
  };

  const handleTipoChange = (tipo: string) => {
    setTipoProva(tipo);
    setCurrentPage(1);
  };

  const handleQuestionAnswer = (questionId: number, optionId: string, correct: boolean, sourceElement?: HTMLElement) => {
    playSound(correct ? 'correct' : 'incorrect');
    
    if (correct) {
      setShowConfetti(true);
      
      // Trigger XP animation on mobile
      if (sourceElement && window.innerWidth < 768) {
        const xpPoints = 10; // Base XP amount
        triggerXPAnimation(xpPoints, sourceElement);
        setDrawerXPReceived(true);
        
        // Reset drawer state after animation
        setTimeout(() => {
          setDrawerXPReceived(false);
        }, 4000);
      }
    }
  };

  const handleAnimationComplete = () => {
    resetAnimation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      
      {/* Mobile Progress Drawer */}
      <MobileProgressDrawer 
        onXPReceived={drawerXPReceived ? () => {} : undefined}
      />

      {/* XP Pill Animation */}
      <XPPillAnimation
        isVisible={isAnimating}
        xpAmount={xpAmount}
        startPosition={startPosition}
        endPosition={endPosition}
        onAnimationComplete={handleAnimationComplete}
      />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
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

          {filteredQuestions.map((question) => (
            <QuestionCard 
              key={question.id} 
              question={question}
              onAnswerWithEffects={(optionId: string, correct: boolean, sourceElement?: HTMLElement) => {
                handleQuestionAnswer(question.id, optionId, correct, sourceElement);
              }}
            />
          ))}

          <QuestionsPagination
            paginaAtual={currentPage}
            totalPaginas={Math.ceil(totalQuestions / questionsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
}
