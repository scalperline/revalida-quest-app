
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import { usePremiumChallenge } from '@/hooks/usePremiumChallenge';
import { Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { PremiumChallengeSection } from '@/components/pricing/PremiumChallengeSection';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansGrid } from '@/components/pricing/PricingPlansGrid';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFooter } from '@/components/pricing/PricingFooter';

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, subscription_tier, loading } = useSubscription();
  const {
    canStartBasic,
    canStartSupreme,
    basicAttemptsLeft,
    supremeAttemptsLeft,
    hasWonBasic,
    hasWonSupreme,
    startChallenge,
    resetAttempts
  } = usePremiumChallenge();

  const handleStartChallenge = (type: 'basic' | 'supreme') => {
    if (!user) {
      navigate('/auth');
      return;
    }
    startChallenge(type);
  };

  return (
    <div className="min-h-screen stellar-gradient relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-pink-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <Sparkles className="absolute top-20 left-20 w-8 h-8 text-blue-300 opacity-30 animate-pulse delay-500" />
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-[33px]">
          <PricingHeader />

          <PremiumChallengeSection 
            canStartBasic={canStartBasic}
            canStartSupreme={canStartSupreme}
            basicAttemptsLeft={basicAttemptsLeft}
            supremeAttemptsLeft={supremeAttemptsLeft}
            hasWonBasic={hasWonBasic}
            hasWonSupreme={hasWonSupreme}
            onStartChallenge={handleStartChallenge}
            onResetAttempts={resetAttempts}
          />

          <PricingPlansGrid subscribed={subscribed} subscription_tier={subscription_tier} loading={loading} />

          <PricingFAQ />

          <PricingFooter />
        </div>
      </div>
    </div>
  );
}
