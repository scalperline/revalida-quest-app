
import { PricingPlansGrid } from "@/components/pricing/PricingPlansGrid";
import { SupremeChallengeSection } from "@/components/pricing/SupremeChallengeSection";
import { useState, useEffect } from 'react';
import { getFixedSupremeChallengeQuestions } from '@/utils/fixedSupremeChallengeQuestions';

export function PricingSection() {
  // Challenge states - using fixed questions
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);

  // Prepare fixed challenge questions
  useEffect(() => {
    console.log('🎯 Preparing Supreme Challenge with fixed questions...');
    
    try {
      const fixedQuestions = getFixedSupremeChallengeQuestions();
      setChallengeQuestions(fixedQuestions);
      setChallengeReady(true);
      console.log('✅ Supreme Challenge prepared with fixed questions:', fixedQuestions.length);
    } catch (error) {
      console.error('❌ Error preparing fixed questions:', error);
      setChallengeReady(false);
    }
  }, []);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Escolha seu{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl">
              plano ideal
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Comece grátis e evolua conforme suas necessidades. Todos os planos incluem
            acesso às questões oficiais e sistema gamificado.
          </p>
        </div>

        {/* Supreme Challenge Section - Only on Desktop */}
        <div className="hidden lg:block mb-16">
          <SupremeChallengeSection
            todasQuestoes={challengeQuestions}
            challengeQuestions={challengeQuestions}
            challengeReady={challengeReady}
            setChallengeQuestions={setChallengeQuestions}
            setChallengeReady={setChallengeReady}
          />
        </div>

        {/* Pricing Grid */}
        <PricingPlansGrid subscribed={false} subscription_tier={null} loading={false} showSupremeChallenge={true} />
      </div>
    </section>
  );
}
