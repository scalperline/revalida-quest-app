
import { MobileProgressSection } from './MobileProgressSection';
import { MobileUpgradeButton } from './MobileUpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Progress Section with Upgrade Button - Responsive container */}
      <div className="flex flex-col xs:flex-row items-center xs:items-start gap-2 xs:gap-3">
        <div className="w-full xs:flex-1">
          <MobileProgressSection />
        </div>
        <div className="w-full xs:w-auto">
          <MobileUpgradeButton />
        </div>
      </div>
    </div>
  );
}
