import { Stethoscope, Sparkles, Star } from 'lucide-react';
export function PricingHeader() {
  return <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-16 h-16 medical-gradient flex items-center justify-center shadow-2xl rounded-lg my-0 py-[2px] px-[3px]">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent md:text-4xl text-2xl">Planos RevalidaQuest</h1>
      </div>
      <p className="text-white/90 max-w-3xl mx-auto mb-8 text-base">
        Acelere sua preparação para o Revalida com nossos planos especializados
      </p>
    </div>;
}