
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Brain, Rocket, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingData {
  weeklyGoal: number;
  focusAreas: string[];
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

const medicalAreas = [
  'Cardiologia',
  'Neurologia',
  'Gastroenterologia',
  'Pneumologia',
  'Endocrinologia',
  'Nefrologia',
  'Ginecologia e Obstetrícia',
  'Pediatria',
  'Psiquiatria',
  'Dermatologia',
  'Ortopedia',
  'Oftalmologia',
  'Otorrinolaringologia',
  'Urologia',
  'Oncologia',
  'Infectologia',
  'Reumatologia',
  'Geriatria'
];

const goalOptions = [30, 50, 100];

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(50);
  const [customGoal, setCustomGoal] = useState<string>('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const navigate = useNavigate();

  const progress = (currentStep / 3) * 100;

  const handleGoalSelect = (goal: number) => {
    setWeeklyGoal(goal);
    setCustomGoal('');
  };

  const handleCustomGoalChange = (value: string) => {
    setCustomGoal(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setWeeklyGoal(numValue);
    }
  };

  const handleAreaToggle = (area: string) => {
    setFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete({ weeklyGoal, focusAreas });
  };

  const handleStartMission = () => {
    const data = { weeklyGoal, focusAreas };
    onComplete(data);
    
    // Navigate to simulado with filtered areas
    const params = new URLSearchParams({
      areas: focusAreas.join(','),
      quantidade: '10'
    });
    navigate(`/simulado?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-8 h-8 text-blue-500" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Configure sua Jornada
            </CardTitle>
          </div>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Passo {currentStep} de 3
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">1️⃣ Defina sua Meta Semanal</h3>
                <p className="text-muted-foreground mb-6">
                  Quantas questões você quer resolver por semana?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {goalOptions.map((goal) => (
                  <Button
                    key={goal}
                    variant={weeklyGoal === goal ? "default" : "outline"}
                    className={`h-16 text-lg font-semibold ${
                      weeklyGoal === goal 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    onClick={() => handleGoalSelect(goal)}
                  >
                    {goal} questões
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-goal">Ou defina uma meta personalizada:</Label>
                <Input
                  id="custom-goal"
                  type="number"
                  placeholder="Ex: 75"
                  value={customGoal}
                  onChange={(e) => handleCustomGoalChange(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Dica:</strong> Comece com uma meta alcançável. Você sempre pode ajustar depois!
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">2️⃣ Escolha suas Áreas de Foco</h3>
                <p className="text-muted-foreground mb-6">
                  Selecione as especialidades que você quer priorizar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {medicalAreas.map((area) => (
                  <div
                    key={area}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent ${
                      focusAreas.includes(area)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                        : 'border-border'
                    }`}
                    onClick={() => handleAreaToggle(area)}
                  >
                    <Checkbox
                      checked={focusAreas.includes(area)}
                      onChange={() => handleAreaToggle(area)}
                    />
                    <Label className="cursor-pointer flex-1 text-sm">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  🎯 <strong>Selecionadas:</strong> {focusAreas.length} áreas
                  {focusAreas.length === 0 && " - Selecione pelo menos uma área para continuar"}
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">3️⃣ Sua Primeira Missão</h3>
                <p className="text-muted-foreground mb-6">
                  Pronto para começar! Vamos fazer um simulado focado nas suas áreas escolhidas.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Missão Inicial: Simulado Focado
                    </h4>
                  </div>
                  
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <p><strong>🎯 Meta semanal:</strong> {weeklyGoal} questões</p>
                    <p><strong>🧠 Áreas de foco:</strong> {focusAreas.length} selecionadas</p>
                    <p><strong>📝 Primeira atividade:</strong> 10 questões das suas áreas</p>
                  </div>

                  <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      🏆 Complete esta missão para ganhar seus primeiros pontos XP!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} className="h-12">
                  Voltar
                </Button>
              )}
              {onSkip && currentStep === 1 && (
                <Button variant="ghost" onClick={onSkip} className="h-12 text-muted-foreground">
                  Pular configuração
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStep < 3 && (
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === 2 && focusAreas.length === 0}
                  className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Continuar
                </Button>
              )}
              
              {currentStep === 3 && (
                <Button 
                  onClick={handleStartMission}
                  className="h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Começar Agora 🚀
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
