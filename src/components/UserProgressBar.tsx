
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-4">
      <ProgressSection />
      <UpgradeButton />
      <LogoutButton />
    </div>
  );
}
