
import { Settings2 } from "lucide-react";
import { StatsResetDialog } from "./StatsResetDialog";

interface StatsControlsProps {
  onReset: () => void;
  hasAnyData: boolean;
}

export function StatsControls({ onReset, hasAnyData }: StatsControlsProps) {
  if (!hasAnyData) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-blue-100 dark:border-gray-700 shadow-xl mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Controles</h3>
        </div>
        <StatsResetDialog onReset={onReset} />
      </div>
    </div>
  );
}
