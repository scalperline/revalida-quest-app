
import { Stethoscope, Sparkles, Star } from 'lucide-react';

export function PricingHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center shadow-2xl">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent text-3xl md:text-4xl">
          Planos RevalidaQuest
        </h1>
      </div>
      <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
        Acelere sua preparação para o Revalida com nossos planos especializados
      </p>
    </div>
  );
}
