
import { Navbar } from '@/components/Navbar';
import { SupremeChallengeCard } from '@/components/SupremeChallengeCard';
import { RecentAchievements } from '@/components/RecentAchievements';
import { AdaptiveSuggestions } from '@/components/AdaptiveSuggestions';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Revalida Premium
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Prepare-se para o Revalida com questões oficiais, simulados personalizados e gamificação completa
          </p>
        </div>
        
        {/* Supreme Challenge Highlight */}
        <div className="max-w-md mx-auto mb-12">
          <SupremeChallengeCard />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentAchievements />
          <AdaptiveSuggestions />
        </div>
      </div>
    </div>
  );
}
