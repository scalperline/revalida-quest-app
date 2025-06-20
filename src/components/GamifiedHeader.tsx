
import { useState } from "react";
import { Search, Filter, Trophy, Zap, Target, Book } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";
import { ProgressBar } from "./ProgressBar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface GamifiedHeaderProps {
  totalQuestoes: number;
  onSearch: (query: string) => void;
  onAreaFilter: (area: string) => void;
  onDifficultyFilter: (difficulty: string) => void;
  searchQuery: string;
  selectedArea: string;
  selectedDifficulty: string;
}

const AREAS = [
  "Todas as áreas",
  "Clínica Médica",
  "Cirurgia",
  "Pediatria",
  "Ginecologia e Obstetrícia",
  "Medicina Preventiva",
  "Psiquiatria",
  "Ortopedia",
  "Cardiologia",
  "Neurologia",
  "Dermatologia",
  "Oftalmologia",
  "Otorrinolaringologia",
  "Urologia",
  "Anestesiologia",
  "Radiologia",
  "Patologia",
  "Medicina Legal",
  "Medicina do Trabalho",
  "Medicina de Família"
];

const DIFFICULTIES = [
  "Todas as dificuldades",
  "Fácil",
  "Médio",
  "Difícil",
  "Muito Difícil"
];

export function GamifiedHeader({
  totalQuestoes,
  onSearch,
  onAreaFilter,
  onDifficultyFilter,
  searchQuery,
  selectedArea,
  selectedDifficulty
}: GamifiedHeaderProps) {
  const { userProgress, getAccuracy } = useGamification();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Gaming Stats Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Book className="w-8 h-8 text-yellow-400" />
                <h1 className="text-3xl font-bold">Banco de Questões</h1>
              </div>
              <p className="text-blue-100 text-lg">
                Domine o Revalida com questões oficiais do INEP
              </p>
            </div>
          </div>

          {/* Gaming Stats Cards */}
          <div className="flex gap-4">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-100">Nível</span>
              </div>
              <div className="text-2xl font-bold">{userProgress.level}</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/30">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-100">Precisão</span>
              </div>
              <div className="text-2xl font-bold">{getAccuracy()}%</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-100">XP</span>
              </div>
              <div className="text-2xl font-bold">{userProgress.xp}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Progresso de Nível</span>
            <span className="text-blue-200">
              {userProgress.xp} / {userProgress.xpToNextLevel} XP
            </span>
          </div>
          <ProgressBar
            level={userProgress.level}
            xp={userProgress.xp}
            xpToNextLevel={userProgress.xpToNextLevel}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar questões por palavra-chave..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500 focus:bg-white"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/20">
              <div>
                <label className="block text-sm font-medium mb-2">Área do Conhecimento</label>
                <Select value={selectedArea} onValueChange={onAreaFilter}>
                  <SelectTrigger className="bg-white/90 border-white/30 text-gray-900">
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
                <Select value={selectedDifficulty} onValueChange={onDifficultyFilter}>
                  <SelectTrigger className="bg-white/90 border-white/30 text-gray-900">
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

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="text-blue-100">
              {totalQuestoes > 0
                ? `${totalQuestoes} questões encontradas`
                : "Nenhuma questão encontrada"}
            </div>
            <div className="text-sm text-blue-200">
              💡 Dica: Use filtros para encontrar questões específicas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
