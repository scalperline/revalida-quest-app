
import { Stethoscope } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthFormHeader() {
  return (
    <CardHeader className="text-center pb-6">
      {/* Logo Mobile */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center shadow-2xl">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold gradient-text">
              Revalida Quest
            </h2>
          </div>
        </div>
      </div>

      <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
        Bem-vindo ao Revalida Quest
      </CardTitle>
      <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-2">
        Sua jornada médica oficial começa aqui <span className="text-lg">🩺</span>
      </CardDescription>
    </CardHeader>
  );
}
