
import { useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Navbar } from '@/components/Navbar';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansGrid } from '@/components/pricing/PricingPlansGrid';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFooter } from '@/components/pricing/PricingFooter';
import { SupremeChallengeSection } from '@/components/pricing/SupremeChallengeSection';
import { getFixedSupremeChallengeQuestions } from '@/utils/fixedSupremeChallengeQuestions';

export default function Pricing() {
  const { subscribed, subscription_tier, loading } = useSubscription();

  // Challenge states - usando questões fixas
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);

  // Preparar questões fixas do desafio
  useEffect(() => {
    console.log('🎯 Preparando Desafio Supremo com questões fixas...');
    
    try {
      const fixedQuestions = getFixedSupremeChallengeQuestions();
      setChallengeQuestions(fixedQuestions);
      setChallengeReady(true);
      console.log('✅ Desafio Supremo preparado com questões fixas:', fixedQuestions.length);
    } catch (error) {
      console.error('❌ Erro ao preparar questões fixas:', error);
      setChallengeReady(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PricingHeader />

          {/* Supreme Challenge Section */}
          <SupremeChallengeSection
            todasQuestoes={challengeQuestions} // Usar questões fixas
            challengeQuestions={challengeQuestions}
            challengeReady={challengeReady}
            setChallengeQuestions={setChallengeQuestions}
            setChallengeReady={setChallengeReady}
          />

          <PricingPlansGrid subscribed={subscribed} subscription_tier={subscription_tier} loading={loading} />
          <PricingFAQ />
          <PricingFooter />
        </div>
      </div>
    </div>
  );
}
