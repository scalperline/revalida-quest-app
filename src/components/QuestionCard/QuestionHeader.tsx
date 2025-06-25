
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, Calendar, Stethoscope, Star, Zap } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { Question } from "@/types/question";

interface QuestionHeaderProps {
  question: Question;
  isQuestionAnswered: boolean;
  isCorrectAnswer: boolean;
}

const getAreaIcon = (area: string) => {
  const areaLower = area.toLowerCase();
  if (areaLower.includes('cirurg') || areaLower.includes('ortop')) return Trophy;
  if (areaLower.includes('cardio') || areaLower.includes('clínic')) return Stethoscope;
  return Stethoscope; // Default medical icon
};

const getDifficultyLevel = (questionId: number) => {
  // Simple logic to assign difficulty based on question ID
  if (questionId <= 30) return { level: "Fácil", color: "bg-green-500" };
  if (questionId <= 70) return { level: "Intermediária", color: "bg-orange-500" };
  return { level: "Avançada", color: "bg-red-500" };
};

export function QuestionHeader({ question, isQuestionAnswered, isCorrectAnswer }: QuestionHeaderProps) {
  const AreaIcon = getAreaIcon(question.area);
  const difficulty = getDifficultyLevel(question.id);

  return (
    <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-t-xl border-b border-blue-100 dark:border-slate-600 p-6 shadow-md">
      <div className="space-y-4">
        {/* Main Title */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Questão {question.id} – {question.area}
          </h3>
          
          {/* Answer Status */}
          {isQuestionAnswered && (
            <div className="flex items-center gap-2">
              {isCorrectAnswer ? (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">Correto! +10 XP</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 px-4 py-2 rounded-full shadow-sm">
                  <XCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">Incorreto +2 XP</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Badge */}
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm px-3 py-1 text-sm font-medium flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {question.year}
          </Badge>
          
          {/* Area Badge */}
          <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-sm px-3 py-1 text-sm font-medium flex items-center gap-1 max-w-[200px]">
            <AreaIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{question.area}</span>
          </Badge>
          
          {/* Difficulty Badge */}
          <Badge className={`${difficulty.color} hover:opacity-90 text-white border-0 shadow-sm px-3 py-1 text-sm font-medium flex items-center gap-1`}>
            <Star className="w-4 h-4" />
            {difficulty.level}
          </Badge>
        </div>

        {/* XP Incentive */}
        {!isQuestionAnswered && (
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Responda para ganhar XP</span>
            
            {/* Progress dots */}
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500 animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
