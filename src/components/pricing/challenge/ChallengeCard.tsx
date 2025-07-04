
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { ChallengeBackground } from './ChallengeBackground';

interface ChallengeCardProps {
  children: ReactNode;
}

export function ChallengeCard({ children }: ChallengeCardProps) {
  return (
    <div className="relative mb-8 md:mb-16">
      <ChallengeBackground />
      
      <Card className="relative overflow-hidden border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-xl shadow-2xl">
        {children}
      </Card>
    </div>
  );
}
