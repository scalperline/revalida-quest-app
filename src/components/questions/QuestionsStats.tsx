import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, CheckCircle, XCircle } from 'lucide-react';

interface QuestionsStatsProps {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
}

export function QuestionsStats({ 
  totalQuestions, 
  answeredQuestions, 
  correctAnswers, 
  accuracy 
}: QuestionsStatsProps) {
  const incorrectAnswers = answeredQuestions - correctAnswers;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
          <p className="text-xs text-gray-500">questões</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Respondidas</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{answeredQuestions}</div>
          <p className="text-xs text-gray-500">questões</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Corretas</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
          <p className="text-xs text-gray-500">acertos</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Badge 
              variant={accuracy >= 70 ? "default" : accuracy >= 50 ? "secondary" : "destructive"}
              className="text-xs"
            >
              {accuracy}%
            </Badge>
          </div>
          <div className="text-sm font-medium text-gray-600">Precisão</div>
          <div className="flex justify-center gap-2 mt-1">
            <span className="text-xs text-green-600">{correctAnswers}✓</span>
            <span className="text-xs text-red-600">{incorrectAnswers}✗</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}