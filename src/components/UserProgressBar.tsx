
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
      <div className="min-w-0 flex-1">
        <ProgressSection />
      </div>
      <div className="flex items-center gap-1 sm:gap-1.5">
        <UpgradeButton />
        <LogoutButton />
      </div>
    </div>
  );
}
