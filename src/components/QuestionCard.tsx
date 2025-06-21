import { useState, useEffect } from "react";
import { useGamification } from "@/hooks/useGamification";
import { useAudio } from "@/hooks/useAudio";
import { AchievementNotification } from "./AchievementNotification";
import { LevelUpNotification } from "./LevelUpNotification";
import { ConfettiAnimation } from "./ConfettiAnimation";

export type Option = {
  id: string;
  text: string;
  feedbackCorreta?: string;
  feedbackErrada?: string;
};

export type Question = {
  id: number;
  year: number;
  area: string;
  enunciado: string;
  options: Option[];
  correct: string;
  referencia?: string;
  image?: string;
};

interface Props {
  question: Question;
  showAnswer?: boolean;
}

export function QuestionCard({ question, showAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { 
    answerQuestion, 
    userProgress, 
    getNewlyUnlockedAchievement, 
    clearNewlyUnlockedAchievement 
  } = useGamification();
  const { playSound } = useAudio();
  const respostaRevelada = selected || showAnswer;

  // Check for newly unlocked achievements
  const newlyUnlockedAchievement = getNewlyUnlockedAchievement();

  const handleAnswer = (optionId: string) => {
    setSelected(optionId);
    const correct = optionId === question.correct;
    const previousLevel = userProgress.level;
    
    // Play sound based on answer
    if (correct) {
      playSound('correct');
      setShowConfetti(true);
    } else {
      playSound('incorrect');
    }
    
    console.log('Answering question:', { correct, optionId, correctAnswer: question.correct });
    answerQuestion(correct);

    // Check for level up after a short delay
    setTimeout(() => {
      if (userProgress.level > previousLevel) {
        setNewLevel(userProgress.level);
        setShowLevelUp(true);
        playSound('levelup');
      }
    }, 100);
  };

  // Handle achievement notification
  useEffect(() => {
    if (newlyUnlockedAchievement) {
      playSound('achievement');
    }
  }, [newlyUnlockedAchievement, playSound]);

  return (
    <>
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl px-6 py-8 mb-7 border border-blue-100 dark:border-gray-700 max-w-2xl mx-auto flex flex-col gap-4 transition-all duration-200">
        {/* Número da questão oficial com borda em destaque */}
        <div className="flex items-center gap-2 pb-1">
          <div className="rounded-xl border-2 border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 font-bold text-base shadow-lg select-none">
            Quest #{question.id}
          </div>
          {selected && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
              selected === question.correct 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300' 
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-300'
            }`}>
              {selected === question.correct ? '+10 XP ✨' : '+5 XP 💪'}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground pb-1">
          <span className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300 font-medium">{question.year}</span>
          <span className="mx-1 text-xs opacity-80">•</span>
          <span className="bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded text-purple-700 dark:text-purple-300 font-medium capitalize">{question.area}</span>
        </div>
        
        <div className="font-semibold text-lg md:text-xl text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
          {question.enunciado}
        </div>
        
        {question.image && (
          <div className="my-4">
            <img
              src={question.image}
              alt={`Imagem para a questão ${question.id}`}
              className="rounded-lg mx-auto border shadow-md max-w-full h-auto"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-3 pt-2">
          {Array.isArray(question.options) &&
            question.options.map((opt) => {
              const acerto = selected && opt.id === question.correct;
              const erro = selected === opt.id && selected !== question.correct;
              const marcado = selected === opt.id;
              const showHighlight = respostaRevelada && opt.id === question.correct;

              return (
                <button
                  key={opt.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all text-base font-normal hover:scale-[1.01] transform shadow-sm hover:shadow-md
                  ${
                    marcado
                      ? acerto
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-500 text-green-800 shadow-lg"
                        : erro
                        ? "bg-gradient-to-r from-red-100 to-pink-100 border-red-400 text-red-700 shadow-lg"
                        : "border-blue-500 shadow-md bg-blue-50 dark:bg-blue-900/30"
                      : showHighlight
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-800 shadow-md"
                      : "bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                  }
                  ${
                    respostaRevelada
                      ? "cursor-not-allowed opacity-90"
                      : "hover:ring-2 hover:ring-blue-500/30 cursor-pointer"
                  }
                `}
                  disabled={!!selected || showAnswer}
                  onClick={() => handleAnswer(opt.id)}
                >
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-all
                    ${
                      marcado
                        ? acerto
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 shadow-lg"
                          : erro
                          ? "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-700 shadow-lg"
                          : "border-blue-500 bg-blue-500 text-white"
                        : showHighlight
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-500"
                        : "bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 hover:border-blue-500 text-gray-700 dark:text-gray-200"
                    }
                  `}
                  >
                    {opt.id}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {marcado && acerto && (
                    <div className="text-green-600">
                      🎯✨
                    </div>
                  )}
                </button>
              );
            })}
        </div>
        
        {respostaRevelada && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 shadow-md">
            {question.correct === "ANULADA" ? (
              <span className="font-semibold text-lg text-yellow-600 flex items-center gap-2">
                ⚠️ Questão Anulada
              </span>
            ) : (
              <span
                className={`font-semibold text-lg flex items-center gap-2 ${
                  selected === question.correct || showAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selected === question.correct || showAnswer ? "🎯" : "❌"}
                Gabarito: {question.correct}
                {selected &&
                  (selected === question.correct
                    ? " (Missão Cumprida! 🎉)"
                    : " (Continue tentando! 💪)")}
              </span>
            )}
            {question.referencia && (
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                📚 {question.referencia}
              </div>
            )}
          </div>
        )}
      </div>
      
      <AchievementNotification
        achievement={newlyUnlockedAchievement}
        onClose={clearNewlyUnlockedAchievement}
      />
      
      <LevelUpNotification
        show={showLevelUp}
        newLevel={newLevel}
        onClose={() => setShowLevelUp(false)}
      />
    </>
  );
}
