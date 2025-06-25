
import { BadgeCheck } from 'lucide-react';

export function MobileOfficialCards() {
  return (
    <div className="lg:hidden mt-8 space-y-4">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-3 mb-3">
          <BadgeCheck className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Questões Oficiais</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Banco completo com todas as provas do Revalida aplicadas pelo INEP de 2011 a 2025</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-blue-700">1.500+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-800">15</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Anos</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Oficial</div>
          </div>
        </div>
      </div>
    </div>
  );
}
