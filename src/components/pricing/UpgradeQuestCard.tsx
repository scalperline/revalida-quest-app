
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Star, Zap, Gift } from 'lucide-react';

interface UpgradeQuestCardProps {
  onStartQuest: () => void;
}

export function UpgradeQuestCard({ onStartQuest }: UpgradeQuestCardProps) {
  return (
    <Card className="mb-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-green-700">
              🎯 Missão Especial: Evolução Médica
            </CardTitle>
            <p className="text-sm text-gray-600">Complete este desafio e desbloqueie recompensas exclusivas!</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-white/70 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-gray-800 mb-2">📋 Objetivos da Missão:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Escolher seu plano de evolução médica
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Desbloquear acesso a conteúdo premium
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Ganhar XP e badges exclusivas
            </li>
          </ul>
        </div>

        <div className="bg-white/70 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-gray-800 mb-3">🏆 Recompensas da Missão:</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">+1000 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Badge Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Status VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium">Conteúdo Exclusivo</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progresso da Missão</span>
            <span className="font-medium text-green-600">0/3 Objetivos</span>
          </div>
          <Progress value={0} className="h-3 bg-gray-200" />
        </div>

        <Button 
          onClick={onStartQuest}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 text-lg font-semibold"
        >
          <Target className="w-5 h-5 mr-2" />
          🚀 Iniciar Missão de Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}
