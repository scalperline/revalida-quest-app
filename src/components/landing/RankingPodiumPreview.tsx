import { PodiumCard } from "@/components/PodiumCard";
import { TrendingUp } from "lucide-react";

// Dados mockados para o pódio público
const podium = [
  {
    position: 1 as 1,
    name: "Maurício Ferreira",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    level: "Especialista",
    score: 208,
    accuracy: 92,
  },
  {
    position: 2 as 2,
    name: "G. Drummond",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    level: "Especialista",
    score: 204,
    accuracy: 89,
  },
  {
    position: 3 as 3,
    name: "João Pedro",
    avatarUrl: undefined,
    level: "Especialista",
    score: 138,
    accuracy: 85,
  },
];

// Tipo explícito para os dados do pódio
interface PodiumUser {
  position: 1 | 2 | 3;
  name: string;
  avatarUrl?: string;
  level: string;
  score: number;
  accuracy: number;
}

// Novo componente reutilizável para o layout do pódio
function PodiumRow({ podium }: { podium: PodiumUser[] }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-end gap-6 sm:gap-6 md:gap-8 w-full">
      {/* 2º lugar */}
      <div className="order-2 sm:order-1 flex justify-center sm:items-end sm:justify-center sm:translate-y-8 mb-4 sm:mb-0 w-full max-w-xs">
        <PodiumCard {...podium[1]} />
      </div>
      {/* 1º lugar */}
      <div className="order-1 sm:order-2 flex justify-center sm:items-end sm:justify-center sm:-translate-y-4 relative z-10 mb-4 sm:mb-0 w-full max-w-xs">
        <PodiumCard {...podium[0]} />
      </div>
      {/* 3º lugar */}
      <div className="order-3 sm:order-3 flex justify-center sm:items-end sm:justify-center sm:translate-y-8 w-full max-w-xs">
        <PodiumCard {...podium[2]} />
      </div>
    </div>
  );
}

export function RankingPodiumPreview() {
  return (
    <section className="w-full py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 flex flex-col items-center">
        <h2 className="font-bold mb-3 leading-tight flex flex-wrap justify-center items-center gap-1 text-3xl sm:text-4xl md:text-5xl text-center">
          <span className="text-gray-800">Veja quem está no topo!</span>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Ranking</span>
        </h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">Os melhores do ranking Revalida Quest</p>
        {/* Centralização e responsividade do pódio */}
        <PodiumRow podium={podium} />
        {/* Atualizado em tempo real */}
        <div className="flex items-center justify-center gap-3 text-sm text-blue-700 mt-10 bg-blue-50/70 rounded-full px-6 py-3 border border-blue-200/50 mx-auto w-fit">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Atualizado em tempo real</span>
          </div>
        </div>
      </div>
    </section>
  );
} 