
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
    <Card className="w-full max-w-4xl mx-auto border-2 border-blue-200 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b-2 border-blue-200 dark:border-blue-800">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          🎯 Configure Sua Quest Personalizada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Quantidade de Questões */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
          <Label htmlFor="quantidade" className="text-lg font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
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
              className="w-32 border-2 border-indigo-300 focus:border-indigo-500 font-semibold text-lg"
            />
            <span className="text-sm text-muted-foreground font-medium">
              (entre 1 e 100 questões)
            </span>
          </div>
        </div>

        {/* Seleção de Áreas */}
        <div className="space-y-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
          <Label className="text-lg font-bold text-purple-800 dark:text-purple-200 flex items-center gap-2">
            🏥 Áreas Médicas ({areasSelecionadas.length} selecionadas)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-52 overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-300 dark:border-purple-700 shadow-inner">
            {AREAS_DISPONIVEIS.map(area => (
              <div key={area} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                <Checkbox
                  id={area}
                  checked={areasSelecionadas.includes(area)}
                  onCheckedChange={(checked) => handleAreaChange(area, !!checked)}
                  className="border-2 border-purple-300"
                />
                <Label 
                  htmlFor={area} 
                  className="text-sm cursor-pointer hover:text-purple-600 font-medium transition-colors"
                >
                  {area}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas(AREAS_DISPONIVEIS)}
              className="border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 font-semibold"
            >
              ✅ Selecionar Todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas([])}
              className="border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-50 font-semibold"
            >
              🗑️ Limpar Seleção
            </Button>
          </div>
        </div>

        {/* Tempo do Cronômetro */}
        <div className="space-y-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
          <Label className="text-lg font-bold text-green-800 dark:text-green-200 flex items-center gap-2">
            ⏰ Tempo do Cronômetro
          </Label>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-700 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              ℹ️ <strong>Referência INEP:</strong> A primeira prova objetiva do Revalida tem duração oficial de 5 horas (300 minutos)
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-300 dark:border-green-700">
            <Checkbox
              id="tempo-customizado"
              checked={tempoCustomizado}
              onCheckedChange={(checked) => setTempoCustomizado(!!checked)}
              className="border-2 border-green-300"
            />
            <Label htmlFor="tempo-customizado" className="font-semibold">⚙️ Tempo personalizado</Label>
          </div>

          {tempoCustomizado ? (
            <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700">
              <Input
                type="number"
                min="10"
                max="360"
                value={tempoMinutos}
                onChange={(e) => setTempoMinutos(parseInt(e.target.value) || 10)}
                className="w-32 border-2 border-green-300 focus:border-green-500 font-semibold text-lg"
              />
              <span className="text-sm text-muted-foreground font-medium">
                minutos (entre 10 min e 6 horas)
              </span>
            </div>
          ) : (
            <Select 
              value={tempoMinutos.toString()} 
              onValueChange={(value) => setTempoMinutos(parseInt(value))}
            >
              <SelectTrigger className="w-full border-2 border-green-300 focus:border-green-500 font-semibold">
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>
              <SelectContent className="border-2 border-green-200">
                {TEMPOS_PREDEFINIDOS.map(tempo => (
                  <SelectItem key={tempo.valor} value={tempo.valor.toString()} className="font-medium">
                    {tempo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Resumo da Configuração */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-blue-300 dark:border-blue-800 shadow-lg">
          <h3 className="font-bold mb-4 text-blue-800 dark:text-blue-200 text-xl flex items-center gap-2">
            📋 Resumo da Quest Personalizada
          </h3>
          <ul className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
            <li className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="font-semibold">📊</span>
              <strong>{quantidade}</strong> questões selecionadas
            </li>
            <li className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="font-semibold">🏥</span>
              <strong>{areasSelecionadas.length}</strong> áreas médicas
            </li>
            <li className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="font-semibold">⏰</span>
              <strong>{Math.floor(tempoMinutos / 60)}h {tempoMinutos % 60}min</strong> no cronômetro
            </li>
            <li className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="font-semibold">⚡</span>
              Tempo médio por questão: <strong>{Math.round(tempoMinutos / quantidade)} min</strong>
            </li>
            <li className="flex items-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <span className="font-semibold">🏆</span>
              XP estimado: <strong>+{Math.floor(quantidade * 2.5)} XP</strong>
            </li>
          </ul>
        </div>

        {/* Botão Iniciar */}
        <Button
          onClick={handleIniciar}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-white/20"
          size="lg"
        >
          <Play className="w-6 h-6 mr-3" />
          🎯 Iniciar Quest Personalizada
        </Button>
      </CardContent>
    </Card>
  );
}
