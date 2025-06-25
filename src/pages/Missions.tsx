import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMissions } from "@/hooks/useMissions";
import { useGamification } from "@/hooks/useGamification";
import { useToast } from "@/hooks/use-toast";
import { Mission } from "@/types/missions";
import { getQuestionsCountByAreaAndYear } from "@/utils/questionCounter";
import { Target, Zap, Flag, Plus, BookOpen, Calendar } from "lucide-react";

export default function Missions() {
  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedArea, setSelectedArea] = useState("Clínica Médica");
  const [availableQuestions, setAvailableQuestions] = useState(0);
  const [isCreatingMission, setIsCreatingMission] = useState(false);
  const { missions, createMission, completeMission } = useMissions();
  const { startMission } = useGamification();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestionsCount = async () => {
      const count = await getQuestionsCountByAreaAndYear(selectedArea, selectedYear);
      setAvailableQuestions(count);
    };

    fetchQuestionsCount();
  }, [selectedArea, selectedYear]);

  const handleStartMission = async (mission: Mission) => {
    if (availableQuestions < mission.targetQuestions) {
      toast({
        title: "Quest não iniciada",
        description: "Número de questões disponíveis inferior ao número de questões da quest. Por favor, selecione outro ano ou área.",
      });
      return;
    }

    startMission(mission);
  };

  const handleCreateMission = async () => {
    setIsCreatingMission(true);
  };

  const handleSaveMission = async (missionData: Omit<Mission, 'id' | 'progress' | 'completed' | 'reward'>) => {
    try {
      const newMission = await createMission({
        ...missionData,
        area: selectedArea,
        year: selectedYear,
      });
      setIsCreatingMission(false);
      toast({
        title: "Quest Criada!",
        description: `A quest "${newMission.title}" foi criada com sucesso.`,
      });
    } catch (error: any) {
      console.error("Erro ao criar a quest:", error);
      toast({
        title: "Erro ao criar a quest",
        description: error.message || "Ocorreu um erro ao criar a quest.",
        variant: "destructive",
      });
    }
  };

  const years = ["2020", "2021", "2022", "2023"];
  const areas = [
    "Clínica Médica",
    "Cirurgia",
    "Pediatria",
    "Ginecologia e Obstetrícia",
    "Medicina Preventiva e Social",
    "Saúde da Família e Comunidade",
    "Saúde Mental",
    "Emergência",
    "Medicina Intensiva",
    "Anestesiologia",
    "Cardiologia",
    "Pneumologia",
    "Gastroenterologia",
    "Endocrinologia",
    "Nefrologia",
    "Reumatologia",
    "Hematologia",
    "Infectologia",
    "Dermatologia",
    "Neurologia",
    "Geriatria",
    "Oftalmologia",
    "Otorrinolaringologia",
    "Ortopedia",
    "Urologia",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Quests Personalizadas</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Crie quests personalizadas ou aceite desafios prontos para acelerar seu aprendizado! 🎯
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Quests disponíveis
            </h2>
            <Button onClick={handleCreateMission}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Quest
            </Button>
          </div>

          {isCreatingMission && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Criar nova Quest</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ano
                    </label>
                    <Select onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Área
                    </label>
                    <Select onValueChange={setSelectedArea}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <CreateMissionForm
                  availableQuestions={availableQuestions}
                  onCreate={handleSaveMission}
                  onCancel={() => setIsCreatingMission(false)}
                />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                availableQuestions={availableQuestions}
                onStartMission={handleStartMission}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CreateMissionFormProps {
  availableQuestions: number;
  onCreate: (missionData: Omit<Mission, 'id' | 'progress' | 'completed' | 'reward'>) => void;
  onCancel: () => void;
}

function CreateMissionForm({ availableQuestions, onCreate, onCancel }: CreateMissionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [difficulty, setDifficulty] = useState<Mission['difficulty']>("medium");
  const [targetQuestions, setTargetQuestions] = useState(10);
  const [targetAccuracy, setTargetAccuracy] = useState(70);
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !objective) {
      toast({
        title: "Erro ao criar a quest",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (targetQuestions > availableQuestions) {
      toast({
        title: "Erro ao criar a quest",
        description: "Número de questões superior ao número de questões disponíveis. Por favor, selecione outro ano ou área.",
        variant: "destructive",
      });
      return;
    }

    const missionData: Omit<Mission, 'id' | 'progress' | 'completed' | 'reward'> = {
      title,
      description,
      objective,
      difficulty,
      targetQuestions,
      targetAccuracy,
      timeLimit,
    };
    onCreate(missionData);
  };

  const { toast } = useToast();

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Título
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Objetivo
          </label>
          <input
            type="text"
            id="objective"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Dificuldade
          </label>
          <Select onValueChange={(value) => setDifficulty(value as Mission['difficulty'])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Fácil</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="hard">Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="targetQuestions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nº de Questões
          </label>
          <input
            type="number"
            id="targetQuestions"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={targetQuestions}
            onChange={(e) => setTargetQuestions(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="targetAccuracy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            % de Acerto
          </label>
          <input
            type="number"
            id="targetAccuracy"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            value={targetAccuracy}
            onChange={(e) => setTargetAccuracy(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tempo Limite (min)
        </label>
        <input
          type="number"
          id="timeLimit"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
          value={timeLimit || ""}
          placeholder="Opcional"
          onChange={(e) => setTimeLimit(e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Criar Quest</Button>
      </div>
    </form>
  );
}
