
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, Calendar, Stethoscope, Star, Zap, Crown } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { Question } from "@/types/question";

interface QuestionHeaderProps {
  question: Question;
  isQuestionAnswered: boolean;
  isCorrectAnswer: boolean;
}

const getDifficultyLevel = (year: number) => {
  if (year >= 2023) return { level: "Épico", color: "from-purple-500 to-purple-700", icon: Crown };
  if (year >= 2020) return { level: "Raro", color: "from-blue-500 to-blue-700", icon: Star };
  if (year >= 2015) return { level: "Comum", color: "from-green-500 to-green-700", icon: Zap };
  return { level: "Lendário", color: "from-yellow-400 to-orange-500", icon: Trophy };
};

const getAreaIcon = (area: string) => {
  const areaLower = area.toLowerCase();
  if (areaLower.includes('cirurg') || areaLower.includes('ortop')) return Trophy;
  if (areaLower.includes('cardio') || areaLower.includes('clínic')) return Stethoscope;
  return Stethoscope; // Default medical icon
};

export function QuestionHeader({ question, isQuestionAnswered, isCorrectAnswer }: QuestionHeaderProps) {
  const difficulty = getDifficultyLevel(question.year);
  const AreaIcon = getAreaIcon(question.area);
  const DifficultyIcon = difficulty.icon;

  return (
    <CardHeader className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-b border-blue-200 dark:border-gray-600 mobile-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-800/10 dark:to-purple-800/10"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Question Number Badge - Enhanced */}
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 py-2 font-bold">
              <Trophy className="w-4 h-4 mr-2" />
              Questão {question.id}
            </Badge>
            
            {/* Year Badge - Enhanced */}
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 py-2 font-bold">
              <Calendar className="w-4 h-4 mr-2" />
              {question.year}
            </Badge>
            
            {/* Area Badge - Enhanced */}
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 py-2 font-bold max-w-[200px] truncate">
              <AreaIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{question.area}</span>
            </Badge>
            
            {/* Difficulty Badge - New */}
            <Badge className={`bg-gradient-to-r ${difficulty.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 py-2 font-bold`}>
              <DifficultyIcon className="w-4 h-4 mr-2" />
              {difficulty.level}
            </Badge>
          </div>
          
          {/* Answer Feedback - Enhanced */}
          {isQuestionAnswered && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {isCorrectAnswer ? (
                <div className="flex items-center gap-3 text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 px-6 py-3 rounded-full shadow-lg border border-emerald-200 dark:border-emerald-700 animate-pulse">
                  <div className="relative">
                    <CheckCircle className="w-6 h-6" />
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">Correto!</span>
                    <span className="text-xs opacity-80">+10 XP</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-700 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 dark:text-red-300 px-6 py-3 rounded-full shadow-lg border border-red-200 dark:border-red-700">
                  <XCircle className="w-6 h-6" />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">Incorreto</span>
                    <span className="text-xs opacity-80">+2 XP</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* XP and Progress Indicator */}
        {!isQuestionAnswered && (
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Responda para ganhar XP</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
