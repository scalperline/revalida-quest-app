
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="space-y-4">
      {/* Progress Section - Professional Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <ProgressSection />
        </div>
      </div>
      
      {/* Upgrade Button - Centered with proper spacing */}
      <div className="flex justify-center pt-1">
        <div className="w-full max-w-[200px]">
          <UpgradeButton />
        </div>
      </div>
    </div>
  );
}
