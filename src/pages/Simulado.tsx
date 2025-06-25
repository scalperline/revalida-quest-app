
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { SimuladoHeader } from "@/components/SimuladoHeader";
import { SimuladoProgress } from "@/components/SimuladoProgress";
import { SimuladoTimer } from "@/components/SimuladoTimer";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { SimuladoResults } from "@/components/SimuladoResults";
import { SimuladoNavigation } from "@/components/SimuladoNavigation";
import { Button } from "@/components/ui/button";
import { useSimulado } from "@/hooks/useSimulado";
import { useGamification } from "@/hooks/useGamification";
import { getAllQuestions } from "@/utils/questionData";

export default function Simulado() {
  const allQuestions = getAllQuestions();
  const {
    questoesSelecionadas,
    respostas,
    index,
    total,
    atual,
    respostaAtual,
    responder,
    proxima,
    terminou,
    config
  } = useSimulado(allQuestions);

  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(config.tempoMinutos * 60);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const { completeSimulado } = useGamification();

  const handleStart = () => {
    setIsStarted(true);
    setTimeRemaining(config.tempoMinutos * 60);
  };

  const handleAnswer = (resposta: string) => {
    responder(resposta);
    setSelectedAnswer(resposta);
  };

  const handleNext = () => {
    proxima();
    setSelectedAnswer("");
  };

  const handleFinish = () => {
    let score = 0;
    questoesSelecionadas.forEach((question) => {
      const userAnswer = respostas[question.id];
      if (userAnswer === question.correct) {
        score++;
      }
    });
    
    completeSimulado(score, total);
    setIsStarted(false);
  };

  const handleTimeUp = () => {
    handleFinish();
  };

  useEffect(() => {
    const currentAnswer = respostaAtual();
    setSelectedAnswer(currentAnswer || "");
  }, [index, respostaAtual]);

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Simulado Revalida</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Pratique com questões reais do Revalida INEP em formato de simulado! 📋
              </p>
            </div>

            <SimuladoHeader onStart={handleStart} />
          </div>
        </div>
      </div>
    );
  }

  if (terminou) {
    let score = 0;
    questoesSelecionadas.forEach((question) => {
      const userAnswer = respostas[question.id];
      if (userAnswer === question.correct) {
        score++;
      }
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <SimuladoResults
              score={score}
              total={total}
              questions={questoesSelecionadas}
              answers={respostas}
              onRestart={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <SimuladoProgress current={index + 1} total={total} />
          </div>

          <div className="mb-6">
            <SimuladoTimer 
              timeRemaining={timeRemaining} 
              onTimeUp={handleTimeUp}
            />
          </div>

          {atual && (
            <div className="mb-8">
              <QuestionCard 
                question={atual} 
                onAnswer={handleAnswer}
              />
            </div>
          )}

          <SimuladoNavigation
            currentIndex={index}
            totalQuestions={total}
            onNext={handleNext}
            onFinish={handleFinish}
            hasAnswer={!!selectedAnswer}
          />
        </div>
      </div>
    </div>
  );
}
