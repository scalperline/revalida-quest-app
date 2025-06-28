
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Play } from 'lucide-react';

export interface SimuladoConfig {
  quantidade: number;
  areas: string[];
  tempoMinutos: number;
}

interface SimuladoFiltersProps {
  onStart: (config: SimuladoConfig) => void;
}

const AREAS_DISPONIVEIS = [
  'Clínica Médica',
  'Cirurgia Geral',
  'Pediatria',
  'Ginecologia e Obstetrícia',
  'Psiquiatria',
  'Medicina Preventiva e Social',
  'Medicina de Família e Comunidade',
  'Cardiologia',
  'Neurologia',
  'Ortopedia',
  'Dermatologia',
  'Oftalmologia',
  'Otorrinolaringologia',
  'Urologia',
  'Anestesiologia',
  'Radiologia',
  'Patologia',
  'Medicina Legal'
];

const TEMPOS_PREDEFINIDOS = [
  { valor: 30, label: '30 minutos (Revisão Rápida)' },
  { valor: 60, label: '1 hora (Treino Focado)' },
  { valor: 90, label: '1h30 (Simulado Médio)' },
  { valor: 120, label: '2 horas (Simulado Longo)' },
  { valor: 180, label: '3 horas (Simulado Extenso)' },
  { valor: 240, label: '4 horas (Quase Real)' },
  { valor: 300, label: '5 horas (Tempo Real INEP)' }
];

export function SimuladoFilters({ onStart }: SimuladoFiltersProps) {
  const [quantidade, setQuantidade] = useState(10);
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>(['Clínica Médica']);
  const [tempoMinutos, setTempoMinutos] = useState(120);
  const [tempoCustomizado, setTempoCustomizado] = useState(false);

  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setAreasSelecionadas(prev => [...prev, area]);
    } else {
      setAreasSelecionadas(prev => prev.filter(a => a !== area));
    }
  };

  const handleIniciar = () => {
    if (areasSelecionadas.length === 0) {
      alert('Selecione pelo menos uma área para continuar!');
      return;
    }
    
    if (quantidade < 1 || quantidade > 100) {
      alert('A quantidade deve estar entre 1 e 100 questões!');
      return;
    }

    if (tempoMinutos < 10 || tempoMinutos > 360) {
      alert('O tempo deve estar entre 10 minutos e 6 horas!');
      return;
    }

    onStart({
      quantidade,
      areas: areasSelecionadas,
      tempoMinutos
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-blue-200">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="p-2 rounded-lg bg-blue-500 text-white shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          Configure Sua Quest Personalizada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Quantidade de Questões */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-blue-500">
          <Label htmlFor="quantidade" className="text-lg font-semibold flex items-center gap-2">
            📊 Quantidade de Questões
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="quantidade"
              type="number"
              min="1"
              max="100"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              className="w-32 border-2 border-blue-200 focus:border-blue-500"
            />
            <span className="text-sm text-muted-foreground">
              (entre 1 e 100 questões)
            </span>
          </div>
        </div>

        {/* Seleção de Áreas */}
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-purple-500">
          <Label className="text-lg font-semibold flex items-center gap-2">
            🏥 Áreas Médicas ({areasSelecionadas.length} selecionadas)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-4 border-2 border-blue-200 rounded-lg bg-white dark:bg-gray-900">
            {AREAS_DISPONIVEIS.map(area => (
              <div key={area} className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <Checkbox
                  id={area}
                  checked={areasSelecionadas.includes(area)}
                  onCheckedChange={(checked) => handleAreaChange(area, !!checked)}
                  className="border-2"
                />
                <Label 
                  htmlFor={area} 
                  className="text-sm cursor-pointer hover:text-blue-600"
                >
                  {area}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas(AREAS_DISPONIVEIS)}
              className="border-2 border-blue-300 hover:border-blue-500"
            >
              Selecionar Todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas([])}
              className="border-2 border-gray-300 hover:border-gray-500"
            >
              Limpar Seleção
            </Button>
          </div>
        </div>

        {/* Tempo do Cronômetro */}
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-green-500">
          <Label className="text-lg font-semibold flex items-center gap-2">
            ⏱️ Tempo do Cronômetro
          </Label>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              ℹ️ <strong>Referência INEP:</strong> A primeira prova objetiva do Revalida tem duração oficial de 5 horas (300 minutos)
            </p>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200">
            <Checkbox
              id="tempo-customizado"
              checked={tempoCustomizado}
              onCheckedChange={(checked) => setTempoCustomizado(!!checked)}
              className="border-2"
            />
            <Label htmlFor="tempo-customizado" className="font-medium">Tempo personalizado</Label>
          </div>

          {tempoCustomizado ? (
            <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-lg border-2 border-orange-300">
              <Input
                type="number"
                min="10"
                max="360"
                value={tempoMinutos}
                onChange={(e) => setTempoMinutos(parseInt(e.target.value) || 10)}
                className="w-32 border-2 border-orange-200 focus:border-orange-500"
              />
              <span className="text-sm text-muted-foreground">
                minutos (entre 10 min e 6 horas)
              </span>
            </div>
          ) : (
            <Select 
              value={tempoMinutos.toString()} 
              onValueChange={(value) => setTempoMinutos(parseInt(value))}
            >
              <SelectTrigger className="w-full border-2 border-green-200 focus:border-green-500">
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent>
                {TEMPOS_PREDEFINIDOS.map(tempo => (
                  <SelectItem key={tempo.valor} value={tempo.valor.toString()}>
                    {tempo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Resumo da Configuração */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border-2 border-blue-300 shadow-lg">
          <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200 text-lg flex items-center gap-2">
            📋 Resumo da Quest
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>{quantidade}</strong> questões selecionadas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <strong>{areasSelecionadas.length}</strong> áreas médicas
              </li>
            </ul>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>{Math.floor(tempoMinutos / 60)}h {tempoMinutos % 60}min</strong> no cronômetro
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                XP estimado: <strong>+{Math.floor(quantidade * 2.5)} XP</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Botão Iniciar */}
        <Button
          onClick={handleIniciar}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 text-lg border-2 border-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          size="lg"
        >
          <Play className="w-6 h-6 mr-3" />
          🎯 Iniciar Simulado
        </Button>
      </CardContent>
    </Card>
  );
}
