
import { useState } from "react";
import { Trophy, Target, Zap, BookOpen, Search, Filter } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GamifiedQuestionsHeaderProps {
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;
  totalQuestoes: number;
  tipoProva?: string;
  setTipoProva?: (tipo: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
}

const AREAS = [
  "Todos",
  "Clínica Médica",
  "Cirurgia",
  "Pediatria",
  "Ginecologia e Obstetrícia",
  "Medicina Preventiva",
  "Psiquiatria",
  "Cardiologia",
  "Neurologia",
  "Dermatologia",
  "Oftalmologia",
  "Ortopedia",
  "Radiologia"
];

const DIFFICULTIES = [
  "Todas",
  "Fácil",
  "Médio",
  "Difícil"
];

export function GamifiedQuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
  tipoProva,
  setTipoProva,
  searchTerm,
  setSearchTerm,
  selectedArea,
  setSelectedArea,
  selectedDifficulty,
  setSelectedDifficulty,
}: GamifiedQuestionsHeaderProps) {
  const { userProgress, getAccuracy, getProgressPercentage } = useGamification();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-6 mb-8 shadow-xl">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível</p>
              <p className="text-lg font-bold text-blue-600">{userProgress.level}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Precisão</p>
              <p className="text-lg font-bold text-green-600">{getAccuracy()}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">XP</p>
              <p className="text-lg font-bold text-purple-600">{userProgress.xp}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Questões</p>
              <p className="text-lg font-bold text-orange-600">{userProgress.totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-blue-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progresso para o próximo nível
          </span>
          <span className="text-sm text-muted-foreground">
            {userProgress.xp} / {userProgress.xpToNextLevel} XP
          </span>
        </div>
        <Progress value={getProgressPercentage()} className="h-3" />
      </div>

      {/* Title and Year/Type Selectors */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Banco de Questões Revalida
        </h1>
        <div className="flex items-center gap-4">
          <Select
            onValueChange={(value) => setAnoSelecionado(parseInt(value))}
            defaultValue={anoSelecionado.toString()}
          >
            <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600">
              <SelectValue placeholder="Selecione o Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2011">Revalida 2011</SelectItem>
              <SelectItem value="2012">Revalida 2012</SelectItem>
              <SelectItem value="2013">Revalida 2013</SelectItem>
              <SelectItem value="2014">Revalida 2014</SelectItem>
              <SelectItem value="2015">Revalida 2015</SelectItem>
              <SelectItem value="2016">Revalida 2016</SelectItem>
              <SelectItem value="2017">Revalida 2017</SelectItem>
              <SelectItem value="2020">Revalida 2020</SelectItem>
              <SelectItem value="2021">Revalida 2021</SelectItem>
              <SelectItem value="2022">Revalida 2022</SelectItem>
              <SelectItem value="2023">Revalida 2023</SelectItem>
              <SelectItem value="2024">Revalida 2024</SelectItem>
              <SelectItem value="2025">Revalida 2025</SelectItem>
            </SelectContent>
          </Select>
          
          {[2013, 2014, 2015, 2016, 2017, 2022, 2023].includes(anoSelecionado) &&
            tipoProva &&
            setTipoProva && (
              <Select onValueChange={setTipoProva} defaultValue={tipoProva}>
                <SelectTrigger className="w-[180px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600">
                  <SelectValue placeholder="Selecione a Prova" />
                </SelectTrigger>
                <SelectContent>
                  {[2013, 2014, 2015].includes(anoSelecionado) ? (
                    <>
                      <SelectItem value="Cinza">Prova Cinza</SelectItem>
                      <SelectItem value="Vermelha">Prova Vermelha</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Prova 1">Prova 1</SelectItem>
                      <SelectItem value="Prova 2">Prova 2</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar questões por palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros Avançados</span>
          </button>
          <div className="text-sm text-muted-foreground">
            {totalQuestoes > 0
              ? `${totalQuestoes} questões encontradas`
              : "Nenhuma questão encontrada"}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-blue-100 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium mb-2">Área do Conhecimento</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600">
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  {AREAS.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nível de Dificuldade</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600">
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
