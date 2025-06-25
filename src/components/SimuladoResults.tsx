
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Question } from "@/types/question";

interface SimuladoResultsProps {
  score: number;
  total: number;
  questions: Question[];
  answers: Record<number, string>;
  onRestart: () => void;
}

export function SimuladoResults({ score, total, questions, answers, onRestart }: SimuladoResultsProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = () => {
    if (percentage >= 70) return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>;
    if (percentage >= 50) return <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>;
    return <Badge className="bg-red-100 text-red-800">Reprovado</Badge>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl">Simulado Concluído!</CardTitle>
          <div className={`text-4xl font-bold ${getScoreColor()}`}>
            {score}/{total} ({percentage}%)
          </div>
          {getScoreBadge()}
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={onRestart} className="mt-4">
            <RotateCcw className="w-4 h-4 mr-2" />
            Fazer Novo Simulado
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revisão das Questões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Questão {index + 1}</span>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <Badge variant={isCorrect ? "default" : "destructive"}>
                      {isCorrect ? "Correta" : "Incorreta"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{question.area}</p>
                  <p className="mb-3">{question.enunciado}</p>
                  <div className="text-sm">
                    <p><strong>Sua resposta:</strong> {userAnswer || "Não respondida"}</p>
                    <p><strong>Resposta correta:</strong> {question.correct}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
