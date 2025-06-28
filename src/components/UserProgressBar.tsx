
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-3">
      <ProgressSection />
      <div className="flex items-center gap-2">
        <UpgradeButton />
        <LogoutButton />
      </div>
    </div>
  );
}
