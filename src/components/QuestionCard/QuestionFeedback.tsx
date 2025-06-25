
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Question } from "@/types/question";

interface QuestionFeedbackProps {
  question: Question;
  showAnswer: boolean;
  selectedOption?: string | null;
  userAnswer?: string;
}

export function QuestionFeedback({ question, showAnswer, selectedOption, userAnswer }: QuestionFeedbackProps) {
  if (!showAnswer) return null;

  const answer = userAnswer || selectedOption;
  const isCorrect = answer === question.correct;
  const correctOption = question.options.find(opt => opt.id === question.correct);
  const selectedOptionData = question.options.find(opt => opt.id === answer);

  return (
    <>
      {/* Simple answer confirmation card */}
      <div className="mt-6 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <div>
            <p className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-200">
              <strong>Gabarito:</strong> Alternativa {question.correct}
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              {correctOption?.text}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced feedback only for incorrect answers */}
      {!isCorrect && (
        <div className="mt-6 sm:mt-8 space-y-6">
          {/* Detailed analysis of why the answer is wrong */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200 dark:border-orange-700 rounded-lg">
            <div className="flex items-start gap-3 sm:gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-800 dark:text-orange-200 mb-3 text-lg sm:text-xl">
                  🔍 Por que sua resposta está incorreta?
                </p>
                <div className="text-base sm:text-lg text-orange-700 dark:text-orange-300 leading-relaxed space-y-3">
                  {selectedOptionData?.feedbackErrada ? (
                    <p>{selectedOptionData.feedbackErrada}</p>
                  ) : (
                    <div>
                      <p className="mb-3">
                        A alternativa escolhida não é a mais adequada porque pode:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Não seguir as diretrizes clínicas atuais</li>
                        <li>Apresentar riscos desnecessários ao paciente</li>
                        <li>Não ser a primeira linha de tratamento</li>
                        <li>Ter contraindicações no contexto apresentado</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Explanation section */}
          <div className="p-5 sm:p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start gap-3 sm:gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200 mb-3 text-lg sm:text-xl">
                  💡 Por que a alternativa correta é a melhor opção?
                </p>
                <div className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed space-y-3">
                  {correctOption?.feedbackCorreta ? (
                    <p>{correctOption.feedbackCorreta}</p>
                  ) : (
                    <div>
                      <p className="mb-3">
                        A alternativa correta é preferível porque:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Segue as diretrizes e protocolos médicos atuais</li>
                        <li>Oferece maior segurança e eficácia</li>
                        <li>É considerada primeira linha para este caso</li>
                        <li>Tem melhor relação custo-benefício</li>
                      </ul>
                    </div>
                  )}
                  
                  {/* Learning reinforcement */}
                  <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-600">
                    <p className="text-sm sm:text-base font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      📚 Para revisar:
                    </p>
                    <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 leading-relaxed">
                      Revise os conceitos de <strong>{question.area}</strong> e pratique mais questões similares para fortalecer seu conhecimento nesta área.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reference section - always show when available */}
      {question.referencia && (
        <div className="mt-6 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>📚 Referência:</strong> {question.referencia}
          </p>
        </div>
      )}
    </>
  );
}
