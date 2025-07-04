
import { useState } from 'react';
import { ResponsiveLayout } from "@/components/ResponsiveLayout";
import { SimuladoHeader } from "@/components/SimuladoHeader";
import { PersonalizedSimuladoSection } from "@/components/PersonalizedSimuladoSection";
import { type SimuladoConfig } from "@/hooks/useSimulado";

export default function Simulado() {
  const [simuladoStarted, setSimuladoStarted] = useState(false);

  const handleStartSimulado = (config: SimuladoConfig) => {
    setSimuladoStarted(true);
  };

  const handleBackToConfig = () => {
    setSimuladoStarted(false);
  };

  return (
    <ResponsiveLayout>
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <main className="relative z-10 w-full pt-4 sm:pt-8 pb-6 sm:pb-8">
          <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
            {simuladoStarted ? (
              <PersonalizedSimuladoSection onBackToTabs={handleBackToConfig} />
            ) : (
              <SimuladoHeader onStart={handleStartSimulado} />
            )}
          </div>
        </main>
      </div>
    </ResponsiveLayout>
  );
}
