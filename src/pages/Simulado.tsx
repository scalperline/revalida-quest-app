
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { SimuladoHeader } from '@/components/SimuladoHeader';
import { SimuladoProgress } from '@/components/SimuladoProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { SimuladoTimer } from '@/components/SimuladoTimer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSimulado } from '@/hooks/useSimulado';
import { useGamification } from '@/hooks/useGamification';
import { useLimitChecker } from '@/hooks/useLimitChecker';
import { useQuestions } from '@/hooks/useQuestions';
import { Clock, CheckCircle, XCircle, Trophy, Lock } from 'lucide-react';

export default function Simulado() {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAndUseFeature, canUseFeature } = useLimitChecker();
  const { completeSimulado } = useGamification();
  const { questoesAnoSelecionado } = useQuestions();
  
  const simulado = useSimulado(questoesAnoSelecionado);

  const [hasCheckedLimits, setHasCheckedLimits] = useState(false);
  const [canStartSimulado, setCanStartSimulado] = useState(false);

  // Check limits when component mounts
  useEffect(() => {
    const checkLimits = async () => {
      const canUse = canUseFeature('simulados');
      setCanStartSimulado(canUse);
      setHasCheckedLimits(true);
    };
    
    checkLimits();
  }, [canUseFeature]);

  // Auto-start simulado if coming from selection and limits allow
  useEffect(() => {
    if (hasCheckedLimits && canStartSimulado && location.state?.autoStart && simulado.questionsSelected.length === 0) {
      handleStartSimulado();
    }
  }, [hasCheckedLimits, canStartSimulado, location.state]);

  const handleStartSimulado = async () => {
    if (!canStartSimulado) return;
    
    const canProceed = await checkAndUseFeature('simulados');
    if (!canProceed) return;
    
    simulado.startSimulado();
  };

  const handleAnswerSubmit = (questionId: number, answerId: string) => {
    simulado.submitAnswer(questionId, answerId);
  };

  const handleFinishSimulado = async () => {
    const results = simulado.finishSimulado();
    
    // Update gamification
    await completeSimulado(results.correctAnswers, results.totalQuestions);
    
    // Navigate to results
    navigate('/simulado/resultado', { 
      state: { 
        results,
        questions: simulado.questionsSelected,
        answers: simulado.answers 
      } 
    });
  };

  // Loading state
  if (!hasCheckedLimits) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Verificando limites...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Limit exceeded state
  if (!canStartSimulado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-700 mb-4">
                    Limite de Simulados Atingido
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Você atingiu o limite mensal de simulados. Faça upgrade para continuar praticando!
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => navigate('/pricing')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Ver Planos Premium
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/questions')}
                    >
                      Voltar às Questões
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {simulado.questionsSelected.length === 0 ? (
            // Simulado not started
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Iniciar Simulado
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Prepare-se para um simulado completo com questões selecionadas do Revalida.
                  </p>
                  <Button 
                    onClick={handleStartSimulado}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!canStartSimulado}
                  >
                    Começar Simulado
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Simulado in progress
            <>
              <SimuladoHeader onStart={handleStartSimulado} />
              <SimuladoProgress 
                current={simulado.currentQuestionIndex + 1}
                total={simulado.questionsSelected.length}
                answers={simulado.answers}
              />
              
              {simulado.isTimerActive && (
                <SimuladoTimer 
                  timeRemaining={simulado.timeRemaining}
                  onTimeUp={handleFinishSimulado}
                />
              )}
              
              {simulado.questionsSelected[simulado.currentQuestionIndex] && (
                <QuestionCard
                  question={simulado.questionsSelected[simulado.currentQuestionIndex]}
                  onAnswerWithEffects={(optionId: string, correct: boolean) => {
                    handleAnswerSubmit(simulado.questionsSelected[simulado.currentQuestionIndex].id, optionId);
                  }}
                />
              )}
              
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={simulado.previousQuestion}
                  disabled={simulado.currentQuestionIndex === 0}
                >
                  Anterior
                </Button>
                
                <span className="text-sm text-gray-600">
                  Questão {simulado.currentQuestionIndex + 1} de {simulado.questionsSelected.length}
                </span>
                
                {simulado.currentQuestionIndex === simulado.questionsSelected.length - 1 ? (
                  <Button
                    onClick={handleFinishSimulado}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Finalizar Simulado
                  </Button>
                ) : (
                  <Button
                    onClick={simulado.nextQuestion}
                    disabled={!simulado.answers[simulado.questionsSelected[simulado.currentQuestionIndex].id]}
                  >
                    Próxima
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
