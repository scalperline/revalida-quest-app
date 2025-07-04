
import { MobileProgressSection } from './MobileProgressSection';
import { MobileUpgradeButton } from './MobileUpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="p-3 sm:p-4 space-y-3">
      <MobileProgressSection />
      
      {/* Upgrade Button Section */}
      <div className="flex justify-center pt-2">
        <MobileUpgradeButton />
      </div>
    </div>
  );
}
