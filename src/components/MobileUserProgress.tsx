
import { useGamification } from '@/hooks/useGamification';
import { MobileProgressSection } from './MobileProgressSection';
import { MobileUpgradeButton } from './MobileUpgradeButton';

export function MobileUserProgress() {
  const { userProgress } = useGamification();
  
  return (
    <div className="p-3 sm:p-4 space-y-3 my-0 py-0">
      {/* Progress Section with Upgrade Button - Responsive container */}
      <MobileProgressSection userProgress={userProgress} />
      <MobileUpgradeButton />
    </div>
  );
}
