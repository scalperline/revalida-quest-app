
import { AlertCircle } from "lucide-react";
import { Question } from "@/types/question";

interface QuestionFeedbackProps {
  question: Question;
  showAnswer: boolean;
}

export function QuestionFeedback({ question, showAnswer }: QuestionFeedbackProps) {
  if (!showAnswer) return null;

  return (
    <>
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2 text-lg sm:text-xl">
              Resposta correta: {question.correct}
            </p>
            <p className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed">
              {question.options.find(opt => opt.id === question.correct)?.text}
            </p>
          </div>
        </div>
      </div>

      {question.referencia && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>Referência:</strong> {question.referencia}
          </p>
        </div>
      )}
    </>
  );
}
