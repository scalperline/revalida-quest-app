
import { Trophy, Crown, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface ChallengeHeaderProps {
  hasWonBefore: boolean;
}

export function ChallengeHeader({ hasWonBefore }: ChallengeHeaderProps) {
  return (
    <CardHeader className="relative z-10 text-center pb-4 md:pb-8 pt-4 md:pt-8 px-4 md:px-6">
      {/* Trophy Icon */}
      <div className="flex justify-center mb-4 md:mb-8">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse relative">
          <Trophy className="w-8 h-8 md:w-12 md:h-12 text-white" />
          <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Crown className="w-3 h-3 md:w-5 md:h-5 text-white" />
          </div>
        </div>
      </div>
      
      <CardTitle className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
          ⚡ DESAFIO SUPREMO ⚡
        </span>
      </CardTitle>
      
      <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed px-2">
        Conquiste o <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">Plano Premium</span> pelo preço do Básico!
      </p>

      {hasWonBefore && (
        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 md:px-6 md:py-3 font-bold text-sm md:text-lg animate-pulse shadow-lg">
          ✨ DESAFIO CONQUISTADO! Desconto Disponível ✨
        </Badge>
      )}
    </CardHeader>
  );
}
