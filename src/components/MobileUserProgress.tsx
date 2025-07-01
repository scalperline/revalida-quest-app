
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Progress Section - Responsive container with better mobile layout */}
      <div className="flex flex-col xs:flex-row items-center xs:items-start gap-2 xs:gap-3">
        <div className="w-full xs:flex-1">
          <ProgressSection />
        </div>
      </div>
      
      {/* Upgrade Button - Full width on mobile, responsive sizing */}
      <div className="w-full">
        <UpgradeButton />
      </div>
    </div>
  );
}
