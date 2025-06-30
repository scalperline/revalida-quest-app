
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="space-y-4">
      {/* Compact Progress Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="scale-90 origin-left">
          <ProgressSection />
        </div>
      </div>
      
      {/* Streamlined Upgrade Button */}
      <div className="flex justify-center">
        <div className="w-full max-w-[200px]">
          <UpgradeButton />
        </div>
      </div>
    </div>
  );
}
