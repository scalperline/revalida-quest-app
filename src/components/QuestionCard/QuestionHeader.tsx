
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, Calendar, Stethoscope, Star, Zap } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { Question } from "@/types/question";

interface QuestionHeaderProps {
  question: Question;
  isCorrect?: boolean;
}

const getAreaIcon = (area: string) => {
  const areaLower = area.toLowerCase();
  if (areaLower.includes('cirurg') || areaLower.includes('ortop')) return Trophy;
  if (areaLower.includes('cardio') || areaLower.includes('clínic')) return Stethoscope;
  return Stethoscope; // Default medical icon
};

const getDifficultyLevel = (question: Question) => {
  let difficultyScore = 0;
  
  // Pontuação baseada na área médica (algumas áreas são mais complexas)
  const areaLower = question.area.toLowerCase();
  if (areaLower.includes('cardiologia') || areaLower.includes('neurologia') || 
      areaLower.includes('oncologia') || areaLower.includes('cirurgia')) {
    difficultyScore += 2;
  } else if (areaLower.includes('infectologia') || areaLower.includes('endocrinologia') || 
             areaLower.includes('nefrologia') || areaLower.includes('pneumologia')) {
    difficultyScore += 1;
  }
  
  // Pontuação baseada no ano (anos mais recentes tendem a ser mais difíceis)
  if (question.year >= 2023) {
    difficultyScore += 2;
  } else if (question.year >= 2020) {
    difficultyScore += 1;
  }
  
  // Pontuação baseada na complexidade do enunciado
  const enunciadoLength = question.enunciado.length;
  if (enunciadoLength > 800) {
    difficultyScore += 2;
  } else if (enunciadoLength > 400) {
    difficultyScore += 1;
  }
  
  // Pontuação baseada na presença de imagem (geralmente mais complexas)
  if (question.image) {
    difficultyScore += 1;
  }
  
  // Pontuação baseada no ID da questão (distribuição mais natural)
  const idMod = question.id % 7; // Usa módulo para criar variação
  if (idMod === 0 || idMod === 6) {
    difficultyScore += 2; // ~28% avançadas
  } else if (idMod === 1 || idMod === 5) {
    difficultyScore += 1; // ~28% intermediárias  
  }
  // ~44% permanecem fáceis (idMod 2, 3, 4)
  
  // Classificação final
  if (difficultyScore >= 5) {
    return { level: "Avançada", color: "bg-red-500" };
  } else if (difficultyScore >= 3) {
    return { level: "Intermediária", color: "bg-orange-500" };
  } else {
    return { level: "Fácil", color: "bg-green-500" };
  }
};

export function QuestionHeader({ question, isCorrect }: QuestionHeaderProps) {
  const AreaIcon = getAreaIcon(question.area);
  const difficulty = getDifficultyLevel(question);
  const isQuestionAnswered = isCorrect !== undefined;

  return (
    <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-slate-800 dark:to-slate-700 rounded-t-xl border-b border-blue-100 dark:border-slate-600 p-6 shadow-md">
      <div className="space-y-4">
        {/* Main Title - sem redundância do tema */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Questão {question.id}
          </h3>
          
          {/* Answer Status */}
          {isQuestionAnswered && (
            <div className="flex items-center gap-2">
              {isCorrect ? (
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
