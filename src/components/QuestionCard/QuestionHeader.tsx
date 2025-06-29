
import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, Trophy, Target, Sparkles } from "lucide-react";

interface QuestionHeaderProps {
  question: Question;
  isCorrect?: boolean;
}

export function QuestionHeader({ question, isCorrect }: QuestionHeaderProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'difícil':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAreaColor = (area: string) => {
    const colors = {
      'Clínica Médica': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cirurgia': 'bg-red-100 text-red-800 border-red-200',
      'Pediatria': 'bg-pink-100 text-pink-800 border-pink-200',
      'Ginecologia e Obstetrícia': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cardiologia': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[area as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="border-b-2 border-gray-100 dark:border-gray-700 pb-4 sm:pb-6 mb-4 sm:mb-6">
      {/* Question Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
              Questão {question.id}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Revalida {question.year}</span>
            </div>
          </div>
        </div>

        {/* Result Indicator */}
        {isCorrect !== undefined && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg animate-fade-in ${
            isCorrect 
              ? 'bg-green-100 text-green-800 border-2 border-green-200' 
              : 'bg-red-100 text-red-800 border-2 border-red-200'
          }`}>
            {isCorrect ? (
              <>
                <Trophy className="w-4 h-4 animate-bounce" />
                <span className="font-semibold text-sm">Correto!</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </>
            ) : (
              <>
                <Target className="w-4 h-4" />
                <span className="font-semibold text-sm">Incorreto</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Badge 
          variant="outline" 
          className={`px-3 py-1 font-semibold text-xs sm:text-sm border-2 shadow-sm hover:shadow-md transition-all duration-200 ${getAreaColor(question.area)}`}
        >
          <BookOpen className="w-3 h-3 mr-1.5" />
          {question.area}
        </Badge>
        
        <Badge 
          variant="outline" 
          className="px-3 py-1 font-semibold text-xs sm:text-sm bg-indigo-100 text-indigo-800 border-2 border-indigo-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Calendar className="w-3 h-3 mr-1.5" />
          {question.year}
        </Badge>
      </div>
    </div>
  );
}
