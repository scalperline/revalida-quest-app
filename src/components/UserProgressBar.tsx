
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-3">
      <div className="min-w-0 flex-1">
        <ProgressSection />
      </div>
      <div className="flex items-center gap-0.5 md:gap-1 lg:gap-1.5">
        <UpgradeButton />
        <LogoutButton />
      </div>
    </div>
  );
}
