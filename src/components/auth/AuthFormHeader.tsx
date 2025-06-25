
import { Stethoscope } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthFormHeader() {
  return (
    <CardHeader className="text-center pb-4">
      {/* Logo Mobile */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 medical-gradient rounded-xl flex items-center justify-center shadow-xl">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div className="ml-2">
            <h2 className="text-xl font-bold gradient-text">
              Revalida Quest
            </h2>
          </div>
        </div>
      </div>

      <CardTitle className="text-2xl font-bold text-gray-800 mb-1">
        Bem-vindo
      </CardTitle>
      <CardDescription className="text-sm text-gray-600 flex items-center justify-center gap-1">
        Sua jornada médica começa aqui <span className="text-base">🩺</span>
      </CardDescription>
    </CardHeader>
  );
}
