
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex flex-col items-center gap-2">
      <ProgressSection />
      <div className="flex items-center gap-4">
        <UpgradeButton />
        <LogoutButton />
      </div>
    </div>
  );
}
