
import { Stethoscope, Shield } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthFormHeader() {
  return (
    <CardHeader className="text-center pb-2 pt-8 relative z-10">
      {/* Desktop stethoscope icon - visible only on desktop */}
      <div className="relative mx-auto mb-6 hidden lg:block">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 animate-pulse">
            <Stethoscope className="w-10 h-10 text-white drop-shadow-lg" style={{ 
              animation: 'pulse 2s ease-in-out infinite' 
            }} />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/50 animate-pulse">
          <Shield className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Mobile version - visible only on mobile */}
      <div className="relative mx-auto mb-6 lg:hidden">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-110">
            <Stethoscope className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold font-space-grotesk">
              <span className="text-white drop-shadow-lg">Revalida</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent font-black">Quest</span>
            </h2>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-400/50 animate-pulse">
          <Shield className="w-2.5 h-2.5 text-white" />
        </div>
      </div>

      <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-black font-space-grotesk leading-tight mb-3">
        <span className="text-white drop-shadow-lg">Bem-vindo ao </span>
        <span className="text-white drop-shadow-lg">Revalida</span>{' '}
        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Quest</span>
      </CardTitle>
      
      <CardDescription className="text-lg sm:text-xl lg:text-2xl mt-4 text-white/95 font-space-grotesk font-medium leading-relaxed">
        🎯 Conquiste seu objetivo médico!
      </CardDescription>
      
      <CardDescription className="text-base sm:text-lg mt-2 text-blue-100/80 font-space-grotesk font-light leading-relaxed">
        Sua jornada médica oficial começa aqui! 🏥
      </CardDescription>
    </CardHeader>
  );
}
