import { useState } from "react";
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
  const [achievementToShow, setAchievementToShow] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { answerQuestion, userProgress } = useGamification();
  const { playSound } = useAudio();
  const respostaRevelada = selected || showAnswer;

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

    // Check for newly unlocked achievements
    setTimeout(() => {
      const newlyUnlocked = userProgress.achievements.find(a => {
        if (!a.unlocked || !a.unlockedAt) return false;
        const timeDiff = Date.now() - (a.unlockedAt instanceof Date ? a.unlockedAt.getTime() : new Date(a.unlockedAt).getTime());
        return timeDiff < 2000;
      });
      
      if (newlyUnlocked) {
        console.log('Showing achievement:', newlyUnlocked);
        playSound('achievement');
        setAchievementToShow(newlyUnlocked);
      }
    }, 100);
  };

  return (
    <>
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="bg-card shadow-lg rounded-2xl px-6 py-8 mb-7 border border-muted max-w-2xl mx-auto flex flex-col gap-4 transition-all duration-200 hover:shadow-xl">
        {/* Número da questão oficial com borda em destaque */}
        <div className="flex items-center gap-2 pb-1">
          <div className="rounded-xl border-2 border-primary bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 font-bold text-base shadow-lg select-none">
            Quest #{question.id}
          </div>
          {selected && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              selected === question.correct 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {selected === question.correct ? '+10 XP ✨' : '+5 XP 💪'}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground pb-1">
          <span>{question.year}</span>
          <span className="mx-2 text-xs opacity-80">|</span>
          <span className="capitalize">{question.area}</span>
        </div>
        
        <div className="font-semibold text-lg md:text-xl text-foreground whitespace-pre-line">
          {question.enunciado}
        </div>
        
        {question.image && (
          <div className="my-4">
            <img
              src={question.image}
              alt={`Imagem para a questão ${question.id}`}
              className="rounded-lg mx-auto border shadow-md"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2 pt-2">
          {Array.isArray(question.options) &&
            question.options.map((opt) => {
              const acerto = selected && opt.id === question.correct;
              const erro = selected === opt.id && selected !== question.correct;
              const marcado = selected === opt.id;
              const showHighlight = respostaRevelada && opt.id === question.correct;

              return (
                <button
                  key={opt.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all text-base font-normal hover:scale-[1.02] transform
                  ${
                    marcado
                      ? acerto
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-500 text-green-800 animate-pulse shadow-lg"
                        : erro
                        ? "bg-gradient-to-r from-red-100 to-pink-100 border-red-400 text-red-700 animate-pulse shadow-lg"
                        : "border-primary shadow-md"
                      : showHighlight
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-800 shadow-md"
                      : "bg-background hover:bg-muted border-muted hover:shadow-md"
                  }
                  ${
                    respostaRevelada
                      ? "cursor-not-allowed opacity-90"
                      : "hover:ring-2 hover:ring-primary/50 cursor-pointer"
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
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-600 animate-bounce shadow-lg"
                          : erro
                          ? "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-700 animate-bounce shadow-lg"
                          : "border-primary bg-primary/10"
                        : showHighlight
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-500"
                        : "bg-white border-muted-foreground/30 hover:border-primary"
                    }
                  `}
                  >
                    {opt.id}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                  {marcado && acerto && (
                    <div className="text-green-600 animate-pulse">
                      🎯✨
                    </div>
                  )}
                </button>
              );
            })}
        </div>
        
        {respostaRevelada && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary shadow-md">
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
          </div>
        )}
      </div>
      
      <AchievementNotification
        achievement={achievementToShow}
        onClose={() => setAchievementToShow(null)}
      />
      
      <LevelUpNotification
        show={showLevelUp}
        newLevel={newLevel}
        onClose={() => setShowLevelUp(false)}
      />
    </>
  );
}
