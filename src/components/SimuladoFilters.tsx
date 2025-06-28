
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Play, Clock, Target, BookOpen, Info } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Principal */}
      <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              <Settings className="w-7 h-7" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Configure Seu Simulado Personalizado
            </span>
          </CardTitle>
          <p className="text-gray-600 mt-2 text-lg">
            Monte seu simulado do jeito que desejar e conquiste experiência estudando para o Revalida
          </p>
        </CardHeader>
      </Card>

      {/* Configurações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quantidade de Questões */}
        <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-blue-600" />
              Quantidade de Questões
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  max="100"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                  className="w-24 text-center border-2 border-blue-200 focus:border-blue-500 text-lg font-semibold"
                />
                <span className="text-sm text-gray-600">questões</span>
              </div>
              <p className="text-xs text-gray-500">
                Escolha entre 1 e 100 questões para seu simulado
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tempo do Simulado */}
        <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-green-600" />
              Tempo do Cronômetro
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Checkbox
                  id="tempo-customizado"
                  checked={tempoCustomizado}
                  onCheckedChange={(checked) => setTempoCustomizado(!!checked)}
                  className="border-2"
                />
                <Label htmlFor="tempo-customizado" className="font-medium text-sm">
                  Tempo personalizado
                </Label>
              </div>

              {tempoCustomizado ? (
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="10"
                    max="360"
                    value={tempoMinutos}
                    onChange={(e) => setTempoMinutos(parseInt(e.target.value) || 10)}
                    className="w-20 text-center border-2 border-orange-200 focus:border-orange-500"
                  />
                  <span className="text-sm text-gray-600">minutos</span>
                </div>
              ) : (
                <Select 
                  value={tempoMinutos.toString()} 
                  onValueChange={(value) => setTempoMinutos(parseInt(value))}
                >
                  <SelectTrigger className="border-2 border-green-200 focus:border-green-500">
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
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Referência INEP:</strong> A primeira prova objetiva do Revalida tem duração oficial de 5 horas (300 minutos)
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Resumo do Simulado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span><strong>{quantidade}</strong> questões</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span><strong>{areasSelecionadas.length}</strong> área(s) médica(s)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span><strong>{Math.floor(tempoMinutos / 60)}h {tempoMinutos % 60}min</strong> no cronômetro</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>XP estimado: <strong>+{Math.floor(quantidade * 2.5)} XP</strong></span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seleção de Áreas */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Áreas Médicas ({areasSelecionadas.length} selecionada{areasSelecionadas.length !== 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 border-2 border-purple-200 rounded-lg bg-white">
            {AREAS_DISPONIVEIS.map(area => (
              <div key={area} className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-50 transition-colors">
                <Checkbox
                  id={area}
                  checked={areasSelecionadas.includes(area)}
                  onCheckedChange={(checked) => handleAreaChange(area, !!checked)}
                  className="border-2"
                />
                <Label 
                  htmlFor={area} 
                  className="text-sm cursor-pointer hover:text-purple-600 leading-tight"
                >
                  {area}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas(AREAS_DISPONIVEIS)}
              className="border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50"
            >
              Selecionar Todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAreasSelecionadas([])}
              className="border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-50"
            >
              Limpar Seleção
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botão Iniciar */}
      <div className="text-center">
        <Button
          onClick={handleIniciar}
          className="w-full max-w-md bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 text-xl border-2 border-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl"
          size="lg"
        >
          <Play className="w-7 h-7 mr-3" />
          🎯 Iniciar Simulado
        </Button>
      </div>
    </div>
  );
}
