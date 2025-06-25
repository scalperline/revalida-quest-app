
import { Stethoscope, Shield } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthFormHeader() {
  return (
    <CardHeader className="text-center pb-2 pt-8 relative z-10">
      {/* Desktop and Mobile icon */}
      <div className="relative mx-auto mb-6">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-110 stethoscope-pulse">
            <Stethoscope className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div className="ml-3 lg:hidden">
            <h2 className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              Revalida Quest
            </h2>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-400/50 animate-pulse">
          <Shield className="w-2.5 h-2.5 text-white" />
        </div>
      </div>
      <CardTitle className="text-2xl sm:text-3xl font-bold font-space-grotesk bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent leading-tight">
        Bem-vindo ao Revalida Quest
      </CardTitle>
      <CardDescription className="text-base sm:text-lg mt-3 text-blue-100 font-space-grotesk font-medium leading-relaxed">
        Sua jornada médica oficial começa aqui! 🏥
      </CardDescription>
    </CardHeader>
  );
}
