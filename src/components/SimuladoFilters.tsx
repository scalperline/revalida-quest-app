
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          Configure Sua Quest Personalizada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quantidade de Questões */}
        <div className="space-y-2">
          <Label htmlFor="quantidade" className="text-lg font-semibold">
            Quantidade de Questões
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="quantidade"
              type="number"
              min="1"
              max="100"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">
              (entre 1 e 100 questões)
            </span>
          </div>
        </div>

        {/* Seleção de Áreas */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Áreas Médicas ({areasSelecionadas.length} selecionadas)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-3 border rounded-lg">
            {AREAS_DISPONIVEIS.map(area => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={area}
                  checked={areasSelecionadas.includes(area)}
                  onCheckedChange={(checked) => handleAreaChange(area, !!checked)}
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
            >
              Selecionar Todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas([])}
            >
              Limpar Seleção
            </Button>
          </div>
        </div>

        {/* Tempo do Cronômetro */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">
            Tempo do Cronômetro
          </Label>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700 mb-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              ℹ️ <strong>Referência INEP:</strong> A primeira prova objetiva do Revalida tem duração oficial de 5 horas (300 minutos)
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox
              id="tempo-customizado"
              checked={tempoCustomizado}
              onCheckedChange={(checked) => setTempoCustomizado(!!checked)}
            />
            <Label htmlFor="tempo-customizado">Tempo personalizado</Label>
          </div>

          {tempoCustomizado ? (
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="10"
                max="360"
                value={tempoMinutos}
                onChange={(e) => setTempoMinutos(parseInt(e.target.value) || 10)}
                className="w-32"
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
              <SelectTrigger className="w-full">
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
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
            📋 Resumo da Quest
          </h3>
          <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
            <li>• <strong>{quantidade}</strong> questões selecionadas</li>
            <li>• <strong>{areasSelecionadas.length}</strong> áreas médicas</li>
            <li>• <strong>{Math.floor(tempoMinutos / 60)}h {tempoMinutos % 60}min</strong> no cronômetro</li>
            <li>• Tempo médio por questão: <strong>{Math.round(tempoMinutos / quantidade)} min</strong></li>
            <li>• XP estimado: <strong>+{Math.floor(quantidade * 2.5)} XP</strong></li>
          </ul>
        </div>

        {/* Botão Iniciar */}
        <Button
          onClick={handleIniciar}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg"
          size="lg"
        >
          <Play className="w-6 h-6 mr-2" />
          🎯 Iniciar Quest
        </Button>
      </CardContent>
    </Card>
  );
}
