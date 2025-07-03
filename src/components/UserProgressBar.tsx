
import { ProgressSection } from './ProgressSection';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      <div className="min-w-0 flex-1">
        <ProgressSection />
      </div>
      <div className="flex items-center gap-1">
        <LogoutButton />
      </div>
    </div>
  );
}
