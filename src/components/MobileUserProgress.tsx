
import { MobileProgressSection } from './MobileProgressSection';
import { MobileUpgradeButton } from './MobileUpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="p-4">
      <MobileProgressSection />
      <div className="mt-3 flex justify-center">
        <MobileUpgradeButton />
      </div>
    </div>
  );
}
