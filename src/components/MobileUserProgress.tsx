
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="space-y-3">
      {/* Progress Section Compacta */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
        <ProgressSection />
      </div>
      
      {/* Upgrade Button Compacto */}
      <div className="flex justify-center">
        <UpgradeButton />
      </div>
    </div>
  );
}
