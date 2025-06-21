
import { Navbar } from "@/components/Navbar";
import { UserProfile } from '@/components/UserProfile';
import { MedicalCardsPanel } from '@/components/MedicalCardsPanel';
import { AdaptiveSuggestions } from '@/components/AdaptiveSuggestions';
import { QuickChallenge } from '@/components/QuickChallenge';
import { QuestsPanel } from '@/components/QuestsPanel';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const navigate = useNavigate();

  const handleQuickChallengeStart = () => {
    toast({
      title: "Desafio Iniciado!",
      description: "Prepare-se para o desafio relâmpago!",
    });
    navigate('/simulado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Meu Perfil Revalida Quest
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe sua jornada épica rumo à aprovação no Revalida! 🚀
            </p>
          </div>
          
          {/* Main Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 mb-8">
            <UserProfile />
          </div>

          {/* Secondary Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AdaptiveSuggestions />
            <QuickChallenge onStart={handleQuickChallengeStart} />
          </div>

          {/* Cards and Quests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MedicalCardsPanel />
            <QuestsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
