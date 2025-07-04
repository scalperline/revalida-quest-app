
import { Navbar } from '@/components/Navbar';
import { GamifiedQuestionsHeader } from '@/components/GamifiedQuestionsHeader';
import { QuickChallenge } from '@/components/QuickChallenge';
import { SupremeChallengeCard } from '@/components/SupremeChallengeCard';
import { PersonalizedSimuladoSection } from '@/components/PersonalizedSimuladoSection';
import { RecentAchievements } from '@/components/RecentAchievements';
import { AdaptiveSuggestions } from '@/components/AdaptiveSuggestions';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <GamifiedQuestionsHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickChallenge />
          <SupremeChallengeCard />
          <PersonalizedSimuladoSection />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentAchievements />
          <AdaptiveSuggestions />
        </div>
      </div>
    </div>
  );
}
