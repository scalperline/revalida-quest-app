
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="p-2 sm:p-3 space-y-2">
      {/* Progress Section with Upgrade Button - More compact for mobile hamburger */}
      <div className="flex flex-col xs:flex-row items-center xs:items-start gap-1.5 xs:gap-2">
        <div className="w-full xs:flex-1 scale-90 origin-center">
          <ProgressSection />
        </div>
        <div className="w-full xs:w-auto scale-90 origin-center">
          <UpgradeButton />
        </div>
      </div>
    </div>
  );
}
