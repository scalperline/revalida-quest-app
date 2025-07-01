
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Zap, TrendingUp, Star, Crown } from 'lucide-react';

export function XPSimulator() {
  const [questionsPerDay, setQuestionsPerDay] = useState([10]);
  const [simuladosPerMonth, setSimuladosPerMonth] = useState([2]);

  const calculateXP = (plan: string) => {
    const dailyQuestions = questionsPerDay[0];
    const monthlySimulados = simuladosPerMonth[0];
    
    const baseXPPerQuestion = 10;
    const baseXPPerSimulado = 100;
    
    let multiplier = 1;
    if (plan === 'Basic') multiplier = 1.5;
    if (plan === 'Premium') multiplier = 2;
    
    const dailyXP = dailyQuestions * baseXPPerQuestion * multiplier;
    const monthlyXP = (dailyXP * 30) + (monthlySimulados * baseXPPerSimulado * multiplier);
    
    return Math.round(monthlyXP);
  };

  const freeXP = calculateXP('Gratuito');
  const basicXP = calculateXP('Basic');
  const premiumXP = calculateXP('Premium');

  return (
    <Card className="mb-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ⚡ Simulador de XP Premium
        </CardTitle>
        <p className="text-center text-gray-600">Descubra quanto XP você ganharia com cada plano!</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              📚 Questões por dia: <span className="font-bold text-blue-600">{questionsPerDay[0]}</span>
            </label>
            <Slider
              value={questionsPerDay}
              onValueChange={setQuestionsPerDay}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              🎯 Simulados por mês: <span className="font-bold text-purple-600">{simuladosPerMonth[0]}</span>
            </label>
            <Slider
              value={simuladosPerMonth}
              onValueChange={setSimuladosPerMonth}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 rounded-xl p-4 border-2 border-gray-200 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Gratuito</h4>
            <div className="text-2xl font-bold text-gray-600">{freeXP.toLocaleString()}</div>
            <div className="text-sm text-gray-500">XP/mês</div>
          </div>

          <div className="bg-white/70 rounded-xl p-4 border-2 border-blue-200 text-center relative">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              +{Math.round(((basicXP - freeXP) / freeXP) * 100)}%
            </Badge>
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">Basic</h4>
            <div className="text-2xl font-bold text-blue-600">{basicXP.toLocaleString()}</div>
            <div className="text-sm text-blue-500">XP/mês</div>
          </div>

          <div className="bg-white/70 rounded-xl p-4 border-2 border-purple-200 text-center relative">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              +{Math.round(((premiumXP - freeXP) / freeXP) * 100)}%
            </Badge>
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-purple-800 mb-2">Premium</h4>
            <div className="text-2xl font-bold text-purple-600">{premiumXP.toLocaleString()}</div>
            <div className="text-sm text-purple-500">XP/mês</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-700">💡 Projeção Anual</span>
          </div>
          <p className="text-sm text-gray-700">
            Com o plano <span className="font-bold text-purple-600">Premium</span>, você ganharia 
            <span className="font-bold text-purple-600"> {(premiumXP * 12).toLocaleString()} XP</span> por ano, 
            o suficiente para alcançar o nível <span className="font-bold text-purple-600">{Math.floor((premiumXP * 12) / 1000)}</span>! 🚀
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
