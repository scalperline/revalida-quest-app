
import { useGamification } from '@/hooks/useGamification';
import { MobileProgressDrawer } from './MobileProgressDrawer';

export function MobileUserProgress() {
  const { userProgress } = useGamification();
  
  return (
    <div className="p-3 sm:p-4 space-y-3 my-0 py-0">
      <MobileProgressDrawer isVisible={true} />
    </div>
  );
}
