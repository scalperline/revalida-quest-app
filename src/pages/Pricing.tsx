
import { useSubscription } from '@/hooks/useSubscription';
import { Navbar } from '@/components/Navbar';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansGrid } from '@/components/pricing/PricingPlansGrid';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { PricingFooter } from '@/components/pricing/PricingFooter';
import { SupremeChallengeCard } from '@/components/pricing/SupremeChallengeCard';

export default function Pricing() {
  const { subscribed, subscription_tier, loading } = useSubscription();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 pt-8 sm:pt-12 pb-8 max-w-7xl">
          <PricingHeader />

          {/* Supreme Challenge Card - Desafio Surpresa (cópia idêntica da landing page) */}
          <div className="flex justify-center mb-16">
            <SupremeChallengeCard />
          </div>

          <PricingPlansGrid subscribed={subscribed} subscription_tier={subscription_tier} loading={loading} />
          <PricingFAQ />
          <PricingFooter />
        </div>
      </div>
    </div>
  );
}
