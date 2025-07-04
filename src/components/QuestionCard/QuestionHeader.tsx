import { BookOpen, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuestionHeaderProps {
  questionId: number;
  area?: string;
  year?: number;
}

export function QuestionHeader({ questionId, area, year }: QuestionHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5" />
          <span className="font-semibold">Questão {questionId}</span>
        </div>
        <div className="flex items-center gap-4">
          {area && (
            <Badge className="bg-white/20 text-white border-white/30">
              {area}
            </Badge>
          )}
          {year && (
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" />
              <span>{year}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}