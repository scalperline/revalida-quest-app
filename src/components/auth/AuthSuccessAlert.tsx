
import { CheckCircle, Stethoscope, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthSuccessAlertProps {
  show: boolean;
}

export function AuthSuccessAlert({ show }: AuthSuccessAlertProps) {
  if (!show) return null;

  return (
    <Alert className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/60 backdrop-blur-sm shadow-lg shadow-green-500/25">
      <CheckCircle className="h-4 w-4 text-green-300" />
      <AlertDescription className="text-green-100 font-space-grotesk text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <Stethoscope className="w-4 h-4" />
          <span>Conta criada! Verifique seu email para confirmar o cadastro.</span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
