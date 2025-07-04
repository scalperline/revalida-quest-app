
import { Stethoscope } from 'lucide-react';

export function PricingHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl rounded-lg">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-bold text-white md:text-4xl text-2xl">
          Planos RevalidaQuest
        </h1>
      </div>
      <p className="text-slate-400 max-w-3xl mx-auto mb-8 text-base">
        Acelere sua preparação para o Revalida com nossos planos especializados
      </p>
    </div>
  );
}
