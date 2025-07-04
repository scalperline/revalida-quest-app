import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface QuestionFeedbackProps {
  showAnswer: boolean;
  selectedOption: string;
  correctAnswer: string;
  referencia?: string;
}

export function QuestionFeedback({ 
  showAnswer, 
  selectedOption, 
  correctAnswer, 
  referencia 
}: QuestionFeedbackProps) {
  if (!showAnswer) return null;

  return (
    <>
      {/* Explanation */}
      {referencia && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Explicação
          </h4>
          <div 
            className="text-blue-700 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: referencia }}
          />
        </div>
      )}

      {/* Answer feedback */}
      <div className={`mt-4 p-4 rounded-lg border-2 ${
        selectedOption === correctAnswer 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          {selectedOption === correctAnswer ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Resposta Correta!</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">Resposta Incorreta</span>
            </>
          )}
        </div>
        <p className={selectedOption === correctAnswer ? 'text-green-700' : 'text-red-700'}>
          A resposta correta é: <strong>({correctAnswer})</strong>
        </p>
      </div>
    </>
  );
}