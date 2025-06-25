
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
      {/* Enhanced feedback for correct answers */}
      {isCorrect ? (
        <div className="mt-6 sm:mt-8 space-y-4">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg shadow-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-200 mb-2 text-lg sm:text-xl">
                  🎉 Parabéns! Resposta correta!
                </p>
                <p className="text-base sm:text-lg text-emerald-700 dark:text-emerald-300 leading-relaxed mb-3">
                  <strong>Alternativa {question.correct}:</strong> {correctOption?.text}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed explanation section for correct answers */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-lg sm:text-xl">
                  🧠 Por que esta é a resposta correta?
                </p>
                <div className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed space-y-3">
                  {correctOption?.feedbackCorreta ? (
                    <p>{correctOption.feedbackCorreta}</p>
                  ) : (
                    <div>
                      <p className="mb-2">
                        Esta alternativa representa a abordagem mais adequada para a situação clínica apresentada, considerando:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Os protocolos médicos estabelecidos</li>
                        <li>A evidência científica atual</li>
                        <li>A segurança do paciente</li>
                        <li>A eficácia terapêutica</li>
                      </ul>
                    </div>
                  )}
                  
                  {/* Educational tip */}
                  <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-600">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      💡 Dica de estudo:
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Continue praticando questões da área de <strong>{question.area}</strong> para consolidar este conhecimento!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Enhanced feedback for incorrect answers with detailed explanation */
        <div className="mt-6 sm:mt-8 space-y-4">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-700 rounded-lg shadow-lg">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800 dark:text-red-200 mb-2 text-lg sm:text-xl">
                  Resposta incorreta
                </p>
                <p className="text-base sm:text-lg text-red-700 dark:text-red-300 leading-relaxed mb-3">
                  <strong>Sua resposta - Alternativa {answer}:</strong> {selectedOptionData?.text}
                </p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-red-200 dark:border-red-600">
                  <p className="font-semibold text-red-800 dark:text-red-200 mb-1">
                    ✓ Resposta correta - Alternativa {question.correct}:
                  </p>
                  <p className="text-red-700 dark:text-red-300">{correctOption?.text}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed analysis of why the answer is wrong */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border border-orange-200 dark:border-orange-700 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200 mb-3 text-lg sm:text-xl">
                  🔍 Por que sua resposta está incorreta?
                </p>
                <div className="text-base sm:text-lg text-orange-700 dark:text-orange-300 leading-relaxed space-y-3">
                  {selectedOptionData?.feedbackErrada ? (
                    <p>{selectedOptionData.feedbackErrada}</p>
                  ) : (
                    <div>
                      <p className="mb-2">
                        A alternativa escolhida não é a mais adequada porque pode:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
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
          <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-lg sm:text-xl">
                  💡 Por que a alternativa correta é a melhor opção?
                </p>
                <div className="text-base sm:text-lg text-blue-700 dark:text-blue-300 leading-relaxed space-y-3">
                  {correctOption?.feedbackCorreta ? (
                    <p>{correctOption.feedbackCorreta}</p>
                  ) : (
                    <div>
                      <p className="mb-2">
                        A alternativa correta é preferível porque:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Segue as diretrizes e protocolos médicos atuais</li>
                        <li>Oferece maior segurança e eficácia</li>
                        <li>É considerada primeira linha para este caso</li>
                        <li>Tem melhor relação custo-benefício</li>
                      </ul>
                    </div>
                  )}
                  
                  {/* Learning reinforcement */}
                  <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-600">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      📚 Para revisar:
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
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
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong>📚 Referência:</strong> {question.referencia}
          </p>
        </div>
      )}
    </>
  );
}
