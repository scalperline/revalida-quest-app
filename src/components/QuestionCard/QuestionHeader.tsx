
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { Question } from "@/types/question";

interface QuestionHeaderProps {
  question: Question;
  isQuestionAnswered: boolean;
  isCorrectAnswer: boolean;
}

export function QuestionHeader({ question, isQuestionAnswered, isCorrectAnswer }: QuestionHeaderProps) {
  return (
    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-b border-blue-200 dark:border-gray-600 mobile-padding">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-700 text-sm sm:text-base px-3 py-1.5">
            Questão {question.id}
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-200 dark:border-purple-700 text-sm sm:text-base px-3 py-1.5">
            {question.year}
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-200 dark:border-green-700 text-sm sm:text-base px-3 py-1.5 text-center">
            {question.area}
          </Badge>
        </div>
        
        {isQuestionAnswered && (
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            {isCorrectAnswer ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Correto!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-full text-sm sm:text-base">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Incorreto</span>
              </div>
            )}
          </div>
        )}
      </div>
    </CardHeader>
  );
}
