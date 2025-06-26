
import { ProgressSection } from './ProgressSection';
import { UpgradeButton } from './UpgradeButton';
import { LogoutButton } from './LogoutButton';

export function UserProgressBar() {
  return (
    <div className="flex items-center gap-4">
      {/* Desktop: Progresso completo */}
      <div className="hidden lg:block">
        <ProgressSection />
      </div>
      
      {/* Mobile: Progresso compacto */}
      <div className="lg:hidden">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 min-w-[200px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Nível 1</div>
                <div className="text-xs text-gray-500">25/200 XP</div>
              </div>
            </div>
            <div className="bg-orange-100 px-2 py-1 rounded-lg">
              <span className="text-xs font-semibold text-orange-700">13%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-3">
        <UpgradeButton />
        <LogoutButton />
      </div>
    </div>
  );
}
