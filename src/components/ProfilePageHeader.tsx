
import { User, Settings, Shield } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export function ProfilePageHeader() {
  const { userProgress } = useGamification();

  return (
    <div className="text-center mb-12">
      {/* Ícone Principal */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/25 transition-shadow duration-300">
          <User className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
          Meu Perfil
        </span>
      </h1>

      {/* Subtítulo */}
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Gerencie sua conta, configurações e acompanhe seu progresso
      </p>

      {/* Badge de Status */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-full px-6 py-2 border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800 dark:text-green-200">
              Nível {userProgress.level} - {userProgress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-2xl p-4 border border-green-200/50 dark:border-green-700/50 max-w-lg mx-auto">
        <p className="text-green-800 dark:text-green-200 font-medium flex items-center gap-2 justify-center">
          <Shield className="w-4 h-4" />
          Mantenha seus dados seguros e configurações atualizadas
        </p>
      </div>
    </div>
  );
}
