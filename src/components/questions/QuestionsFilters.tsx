import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, RotateCcw } from 'lucide-react';

interface QuestionsFiltersProps {
  selectedYear: string;
  selectedArea: string;
  selectedAnswerStatus: string;
  onYearChange: (year: string) => void;
  onAreaChange: (area: string) => void;
  onAnswerStatusChange: (status: string) => void;
  onResetFilters: () => void;
}

export function QuestionsFilters({
  selectedYear,
  selectedArea,
  selectedAnswerStatus,
  onYearChange,
  onAreaChange,
  onAnswerStatusChange,
  onResetFilters
}: QuestionsFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2017', '2016', '2015', '2014', '2013', '2012', '2011'];
  const areas = [
    'Clínica Médica',
    'Cirurgia Geral',
    'Pediatria',
    'Ginecologia e Obstetrícia',
    'Medicina Preventiva e Social',
    'Psiquiatria'
  ];

  const hasActiveFilters = selectedYear !== 'todos' || selectedArea !== 'todas' || selectedAnswerStatus !== 'todas';

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Filtros</h3>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onResetFilters}
                className="text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              {showFilters ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          <div>
            <label className="block text-sm font-medium mb-2">Ano</label>
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os anos</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Área</label>
            <Select value={selectedArea} onValueChange={onAreaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as áreas</SelectItem>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select value={selectedAnswerStatus} onValueChange={onAnswerStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Status da resposta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="nao_respondidas">Não respondidas</SelectItem>
                <SelectItem value="corretas">Corretas</SelectItem>
                <SelectItem value="incorretas">Incorretas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}