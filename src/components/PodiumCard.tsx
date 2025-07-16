import { Crown, Medal, Trophy } from 'lucide-react';

interface PodiumCardProps {
  position: 1 | 2 | 3;
  name: string;
  avatarUrl?: string;
  level: string;
  score: number;
  accuracy: number; // Ex: 82 para 82%
}

const headerStyles = {
  1: 'bg-yellow-400',
  2: 'bg-gray-400',
  3: 'bg-orange-400',
};
const iconMap = {
  1: <Crown className="w-8 h-8 text-white mx-auto" />,
  2: <Medal className="w-8 h-8 text-white mx-auto" />,
  3: <Medal className="w-8 h-8 text-white mx-auto" />,
};
const positionText = {
  1: '1º Lugar',
  2: '2º Lugar',
  3: '3º Lugar',
};
const headerGradients = {
  1: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600',
  2: 'bg-gradient-to-br from-gray-200 via-gray-400 to-gray-500',
  3: 'bg-gradient-to-br from-orange-200 via-orange-400 to-orange-600',
};
const avatarBorderGradients = {
  1: 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600',
  2: 'bg-gradient-to-br from-gray-200 via-gray-400 to-gray-500',
  3: 'bg-gradient-to-br from-orange-200 via-orange-400 to-orange-600',
};
const scoreText = {
  1: 'text-yellow-700',
  2: 'text-gray-700',
  3: 'text-orange-700',
};
const scoreBorder = {
  1: 'border-yellow-400',
  2: 'border-gray-400',
  3: 'border-orange-400',
};
const levelBadge = {
  1: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  2: 'bg-gray-100 text-gray-700 border-gray-300',
  3: 'bg-orange-100 text-orange-800 border-orange-300',
};

export function PodiumCard({ position, name, avatarUrl, level, score, accuracy }: PodiumCardProps) {
  return (
    <div className="rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-xs mx-auto relative p-0" style={{ minWidth: 240, background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)' }}>
      {/* Cabeçalho gradiente premium */}
      <div
        className={`w-full rounded-t-2xl flex flex-col items-center justify-center ${headerGradients[position]} relative shadow-md`}
        style={{ height: 120, paddingBottom: 48 }}
      >
        <div className="mt-4 drop-shadow-lg animate-pulse-slow">{iconMap[position]}</div>
        <div className="text-white font-extrabold text-2xl mt-1 mb-2 select-none drop-shadow-xl z-10 tracking-wide" style={{ textShadow: '0 2px 8px #0004' }}>
          {positionText[position]}
        </div>
      </div>
      {/* Avatar com moldura animada e gradiente */}
      <div className="-mt-8 z-20 flex items-center justify-center">
        <div className={`w-24 h-24 rounded-full p-1.5 shadow-xl animate-glow-pulse ${avatarBorderGradients[position]}`} style={{ boxShadow: '0 0 0 4px #fff, 0 4px 24px 0 rgba(0,0,0,0.10)' }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover bg-white"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-extrabold text-gray-400" style={{ fontFamily: 'Poppins, Inter, sans-serif', letterSpacing: 2 }}>
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          )}
        </div>
      </div>
      {/* Nome e nível */}
      <div className="mt-4 text-center px-4">
        <div className="font-extrabold text-xl text-gray-900 truncate px-5 py-1 rounded-full shadow-md bg-gradient-to-r from-white/80 via-blue-50/80 to-white/80 mx-auto mb-2" style={{ textShadow: '0 1px 4px #fff' }}>{name}</div>
      </div>
      {/* Pontuação (XP) e acerto */}
      <div className="flex items-center justify-center mt-2 mb-1">
        <span className={`flex items-center gap-2 text-3xl font-extrabold rounded-full bg-white/80 shadow px-6 py-1 ${scoreText[position]}`}
          style={{ letterSpacing: 1 }}>
          <span className="text-2xl">⚡</span>
          {score.toLocaleString('pt-BR')}
        </span>
      </div>
    </div>
  );
} 