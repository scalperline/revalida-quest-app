
import { MobileProgressSection } from './MobileProgressSection';
import { MobileUpgradeButton } from './MobileUpgradeButton';

export function MobileUserProgress() {
  return (
    <div className="flex flex-col gap-3">
      <MobileProgressSection />
      <MobileUpgradeButton />
    </div>
  );
}
