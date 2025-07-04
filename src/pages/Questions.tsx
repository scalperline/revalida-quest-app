
import { useState } from "react";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { QuestionCard } from "@/components/QuestionCard";
import { GamifiedQuestionsHeader } from "@/components/GamifiedQuestionsHeader";
import { QuestionsPagination } from "@/components/QuestionsPagination";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { useQuestionsFilters } from "@/hooks/useQuestionsFilters";
import { useAudio } from "@/hooks/useAudio";
import { getDefaultTipoProva } from "@/utils/questionSelector";

export default function Questions() {
  const [anoSelecionado, setAnoSelecionado] = useState(2025);
  const [tipoProva, setTipoProva] = useState<string | null>(getDefaultTipoProva(2025));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");
  const [showConfetti, setShowConfetti] = useState(false);

  const { playSound } = useAudio();

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden -mt-12 xs:-mt-14 sm:-mt-16 lg:-mt-18">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-2 -right-2 xs:-top-4 xs:-right-4 w-12 h-12 xs:w-24 xs:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/4 -left-2 xs:-left-4 w-8 h-8 xs:w-16 xs:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 xs:w-12 xs:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 xs:w-8 xs:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <div className="relative z-10 pt-12 xs:pt-16 sm:pt-20 pb-4 xs:pb-6 sm:pb-8">
          <div className="max-w-4xl mx-auto px-2 xs:px-3 sm:px-4">
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

            <div className="space-y-4 xs:space-y-6 sm:space-y-8">
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

            <div className="mt-6 xs:mt-8 sm:mt-12">
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
      </div>
    </ResponsiveLayout>
  );
}
