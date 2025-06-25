
import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-blue-200/50 dark:border-gray-600/50 rounded-3xl p-6 md:p-8 mb-8 shadow-xl">
      {/* Main Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Year and Type Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <Select
            onValueChange={(value) => setAnoSelecionado(parseInt(value))}
            defaultValue={anoSelecionado.toString()}
          >
            <SelectTrigger className="w-full sm:w-[200px] h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl text-base font-medium shadow-sm hover:shadow-md transition-all">
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
                <SelectTrigger className="w-full sm:w-[200px] h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl text-base font-medium shadow-sm hover:shadow-md transition-all">
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

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Buscar questões por palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl text-base shadow-sm hover:shadow-md focus:shadow-lg transition-all"
          />
        </div>
      </div>

      {/* Filter Toggle and Results */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center gap-2 h-10 px-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-all"
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filtros Avançados</span>
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 px-4 py-2 rounded-xl">
          {totalQuestoes > 0
            ? `${totalQuestoes} questões encontradas`
            : "Nenhuma questão encontrada"}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-gray-700/50 dark:to-gray-600/50 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-gray-600/50">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Área do Conhecimento
            </label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 rounded-xl text-base shadow-sm hover:shadow-md transition-all">
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
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Nível de Dificuldade
            </label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-blue-200 dark:border-gray-600 rounded-xl text-base shadow-sm hover:shadow-md transition-all">
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
  );
}
