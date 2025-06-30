
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="space-y-3">
      {/* Progress Section - Compact Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <ProgressSection />
        </div>
      </div>
      
      {/* Upgrade Button - Compact spacing */}
      <div className="flex justify-center">
        <div className="w-full max-w-[180px]">
          <UpgradeButton />
        </div>
      </div>
    </div>
  );
}
