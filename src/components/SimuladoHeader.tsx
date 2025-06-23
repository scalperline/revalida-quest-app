
import { SimuladoFilters } from "@/components/SimuladoFilters";
import { type SimuladoConfig } from "@/hooks/useSimulado";

interface SimuladoHeaderProps {
  onStart: (config: SimuladoConfig) => void;
}

export function SimuladoHeader({ onStart }: SimuladoHeaderProps) {
  return (
    <div className="pt-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center leading-tight tracking-tight">
          🚩 <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Simulado Personalizado</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Configure seu simulado do jeito que quiser, conquiste XP e acompanhe seu progresso!
        </p>
      </div>
      
      <SimuladoFilters onStart={onStart} />
    </div>
  );
}
