
import { useState } from "react";
import { BookOpen, Search, Filter, ChevronDown } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      
      {/* Título e contador - melhor responsividade */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Banco de Questões
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              {totalQuestoes > 0
                ? `${totalQuestoes} questões encontradas`
                : "Nenhuma questão encontrada"}
            </p>
          </div>
        </div>
        
        {/* Seletores com layout mobile-first */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Select
            onValueChange={(value) => setAnoSelecionado(parseInt(value))}
            defaultValue={anoSelecionado.toString()}
          >
            <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600 text-sm sm:text-base">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600">
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
                <SelectTrigger className="w-full sm:w-[140px] lg:w-[160px] bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600 text-sm sm:text-base">
                  <SelectValue placeholder="Prova" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-blue-200 dark:border-gray-600">
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

      {/* Barra de busca melhorada */}
      <div className="space-y-3 sm:space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            placeholder="Buscar questões por palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 rounded-lg text-sm sm:text-base"
          />
        </div>

        {/* Toggle de filtros melhorado */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Filtros Avançados</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filtros avançados com animação */}
        {showFilters && (
          <div className="animate-in slide-in-from-top-2 duration-200 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-blue-100 dark:border-gray-600">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Área do Conhecimento
              </label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 text-sm sm:text-base">
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 max-h-60">
                  {AREAS.map((area) => (
                    <SelectItem key={area} value={area} className="text-sm sm:text-base">
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nível de Dificuldade
              </label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500 text-sm sm:text-base">
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-600 border-gray-200 dark:border-gray-500">
                  {DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty} className="text-sm sm:text-base">
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
