
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="space-y-2">
      {/* Progress Section - Compacto e otimizado */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-2.5 shadow-sm border border-blue-100/50 dark:border-blue-700/30">
        <ProgressSection />
      </div>
      
      {/* Upgrade Button - Centralizado e compacto */}
      <div className="flex justify-center px-1">
        <div className="w-full max-w-[200px]">
          <UpgradeButton />
        </div>
      </div>
    </div>
  );
}
