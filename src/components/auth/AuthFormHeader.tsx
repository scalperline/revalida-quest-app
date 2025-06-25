
import { Stethoscope, Shield } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthFormHeader() {
  return (
    <CardHeader className="text-center pb-2 pt-8 relative z-10">
      {/* Desktop and Mobile icon - now visible on all screen sizes */}
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
      
      {/* Enhanced typography with color split and larger sizes */}
      <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-space-grotesk leading-tight mb-2">
        <span className="text-white">Revalida</span>{' '}
        <span className="gradient-gold">Quest</span>
      </CardTitle>
      
      {/* Motivational subtitle with emoji */}
      <div className="text-lg sm:text-xl text-orange-accent font-space-grotesk font-semibold mb-3">
        🎯 Conquiste seu objetivo médico!
      </div>
      
      <CardDescription className="text-base sm:text-lg mt-3 text-blue-100 font-space-grotesk font-medium leading-relaxed">
        Sua jornada médica oficial começa aqui! 🏥
      </CardDescription>
    </CardHeader>
  );
}
