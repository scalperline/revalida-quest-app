
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

interface SimuladoNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onFinish: () => void;
  hasAnswer: boolean;
}

export function SimuladoNavigation({ 
  currentIndex, 
  totalQuestions, 
  onNext, 
  onFinish, 
  hasAnswer 
}: SimuladoNavigationProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
        Questão {currentIndex + 1} de {totalQuestions}
      </div>
      
      <div className="flex gap-3">
        {isLastQuestion ? (
          <Button 
            onClick={onFinish}
            disabled={!hasAnswer}
            className="bg-red-600 hover:bg-red-700"
          >
            <Flag className="w-4 h-4 mr-2" />
            Finalizar Simulado
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={!hasAnswer}
          >
            Próxima
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
