
import { useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useQuestions } from '@/hooks/useQuestions';
import { Navbar } from '@/components/Navbar';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansGrid } from '@/components/pricing/PricingPlansGrid';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFooter } from '@/components/pricing/PricingFooter';
import { SupremeChallengeSection } from '@/components/pricing/SupremeChallengeSection';
import { PricingBackground } from '@/components/pricing/PricingBackground';

export default function Pricing() {
  const { subscribed, subscription_tier, loading } = useSubscription();
  const { todasQuestoes } = useQuestions();

  // Challenge states
  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [challengeReady, setChallengeReady] = useState(false);

  // Prepare challenge questions - select shorter questions without images
  useEffect(() => {
    if (todasQuestoes && todasQuestoes.length > 0) {
      console.log('📚 Preparando questões do desafio...', todasQuestoes.length);
      
      // Filter questions: no images, shorter statements, valid structure
      const validQuestions = todasQuestoes.filter(q => 
        q && q.id && q.enunciado && q.options && Array.isArray(q.options) && 
        q.options.length >= 2 && q.correct && q.year && q.area &&
        !q.image && // No images
        q.enunciado.length <= 500 && // Shorter statements
        q.options.every((opt: any) => opt.text && opt.text.length <= 200) // Shorter options
      );
      
      if (validQuestions.length >= 10) {
        // Shuffle and select 10 questions
        const shuffled = [...validQuestions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10);
        setChallengeQuestions(selected);
        setChallengeReady(true);
        console.log('✅ Desafio preparado com', selected.length, 'questões otimizadas');
      } else {
        console.error('❌ Questões otimizadas insuficientes:', validQuestions.length);
        // Fallback to any valid questions if optimized ones are not enough
        const fallbackQuestions = todasQuestoes.filter(q => 
          q && q.id && q.enunciado && q.options && Array.isArray(q.options) && 
          q.options.length >= 2 && q.correct && q.year && q.area
        );
        if (fallbackQuestions.length >= 10) {
          const shuffled = [...fallbackQuestions].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, 10);
          setChallengeQuestions(selected);
          setChallengeReady(true);
          console.log('✅ Desafio preparado com questões de fallback:', selected.length);
        }
      }
    }
  }, [todasQuestoes]);

  return (
    <div className="min-h-screen galaxy-gradient relative overflow-hidden">
      <PricingBackground />

      <div className="navbar">
        <Navbar />
      </div>
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          <PricingHeader />

          {/* Supreme Challenge Section */}
          <SupremeChallengeSection
            todasQuestoes={todasQuestoes}
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

      {/* CSS para ocultar navbar */}
      <style>{`
        .navbar-hidden { 
          display: none !important; 
        }
      `}</style>
    </div>
  );
}
