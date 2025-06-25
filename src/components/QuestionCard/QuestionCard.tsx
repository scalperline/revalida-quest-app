
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionContent } from "./QuestionContent";
import { QuestionOption } from "./QuestionOption";
import { QuestionFeedback } from "./QuestionFeedback";
import { QuestionCardProps } from "@/types/question";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { useAudio } from "@/hooks/useAudio";
import { useGamification } from "@/hooks/useGamification";

export function QuestionCard({ 
  question, 
  showAnswer = false, 
  onAnswer,
  disabled = false,
  userAnswer
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(showAnswer || !!userAnswer);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const { playSound } = useAudio();
  const { answerQuestion, getUserAnswer } = useGamification();

  // Carregar resposta salva do usuário
  useEffect(() => {
    const loadSavedAnswer = async () => {
      if (!userAnswer && !showAnswer) {
        setLoadingAnswer(true);
        const savedAnswer = await getUserAnswer(question.id);
        if (savedAnswer) {
          setSelectedOption(savedAnswer);
          setAnswered(true);
        }
        setLoadingAnswer(false);
      }
    };

    loadSavedAnswer();
  }, [question.id, userAnswer, showAnswer, getUserAnswer]);

  const handleOptionSelect = async (optionId: string) => {
    if (disabled || answered || loadingAnswer) return;
    
    setSelectedOption(optionId);
    setAnswered(true);
    
    const isCorrect = optionId === question.correct;
    
    if (isCorrect) {
      playSound('correct');
      setShowConfetti(true);
    } else {
      playSound('incorrect');
    }

    // Salvar resposta e atualizar progresso
    await answerQuestion(isCorrect, question.area, question.id, optionId);
    
    onAnswer?.(optionId);
  };

  const isQuestionAnswered = answered || showAnswer;
  const isCorrectAnswer = isQuestionAnswered && (userAnswer || selectedOption) === question.correct;

  if (loadingAnswer) {
    return (
      <Card className="w-full border-2 border-blue-100 dark:border-slate-600 shadow-lg rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Carregando questão...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <ConfettiAnimation 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <Card className="w-full border-2 border-blue-100 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-6">
        <QuestionHeader 
          question={question}
          isQuestionAnswered={!!isQuestionAnswered}
          isCorrectAnswer={!!isCorrectAnswer}
        />
        
        <CardContent className="p-6">
          <QuestionContent question={question} />

          <div className="space-y-3">
            {question.options.map((option) => (
              <QuestionOption
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                showAnswer={isQuestionAnswered}
                disabled={disabled}
                correctAnswer={question.correct}
                userAnswer={userAnswer}
                selectedOption={selectedOption}
                onSelect={handleOptionSelect}
              />
            ))}
          </div>

          <QuestionFeedback 
            question={question} 
            showAnswer={isQuestionAnswered}
            selectedOption={selectedOption}
            userAnswer={userAnswer}
          />
        </CardContent>
      </Card>
    </>
  );
}
