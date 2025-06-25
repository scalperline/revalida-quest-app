import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SimuladoFilters } from '@/components/SimuladoFilters';
import { SimuladoHeader } from '@/components/SimuladoHeader';
import { SimuladoProgress } from '@/components/SimuladoProgress';
import { SimuladoTimer } from '@/components/SimuladoTimer';
import { QuestionCard } from '@/components/QuestionCard/QuestionCard';
import { useSimulado } from '@/hooks/useSimulado';

export default function Simulado() {
  const {
    simuladoState,
    simuladoConfig,
    currentQuestion,
    selectedOption,
    timeRemaining,
    startSimulado,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    finishSimulado,
    resetSimulado,
    selectOption,
    setTimeRemaining,
  } = useSimulado();

  useEffect(() => {
    if (simuladoState.isFinished) {
      document.title = 'Simulado Finalizado | RevalidaQuest';
    } else if (simuladoState.isStarted) {
      document.title = `Questão ${simuladoState.currentQuestionIndex + 1}/${simuladoState.questions.length} | RevalidaQuest`;
    } else {
      document.title = 'Simulado | RevalidaQuest';
    }
  }, [simuladoState.isFinished, simuladoState.isStarted, simuladoState.currentQuestionIndex, simuladoState.questions.length]);

  if (!simuladoState.isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Simulado Revalida</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Pratique com questões cronometradas em condições reais de prova 🎯
              </p>
            </div>
            
            <SimuladoFilters onStart={startSimulado} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SimuladoHeader />
          <SimuladoProgress
            currentQuestion={simuladoState.currentQuestionIndex + 1}
            totalQuestions={simuladoState.questions.length}
          />
          <SimuladoTimer
            timeRemaining={timeRemaining}
            isFinished={simuladoState.isFinished}
            onFinish={finishSimulado}
            setTimeRemaining={setTimeRemaining}
          />
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={selectOption}
              onAnswer={answerQuestion}
              showAnswer={simuladoState.showAnswer}
              isAnswering={simuladoState.isAnswering}
              userAnswer={simuladoState.userAnswers[simuladoState.currentQuestionIndex]}
              correctAnswer={currentQuestion.resposta}
            />
          )}
          <div className="flex justify-between mt-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={simuladoState.currentQuestionIndex === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Anterior
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={simuladoState.currentQuestionIndex === simuladoState.questions.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Próxima
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={finishSimulado}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Finalizar Simulado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
