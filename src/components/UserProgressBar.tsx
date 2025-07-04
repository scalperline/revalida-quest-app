
import { useGamification } from '@/hooks/useGamification';
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';

export function UserProgressBar() {
  const { userProgress } = useGamification();
  
  return (
    <div className="flex items-center gap-0.5 md:gap-1 lg:gap-2">
      <div className="min-w-0 flex-1">
        <ProgressSection />
      </div>
      <div className="flex items-center gap-0.5 md:gap-1">
        <UpgradeButton />
      </div>
    </div>
  );
}
