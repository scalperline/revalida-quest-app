
import { CheckCircle, Stethoscope } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthSuccessAlertProps {
  show: boolean;
}

export function AuthSuccessAlert({ show }: AuthSuccessAlertProps) {
  if (!show) return null;

  return (
    <Alert className="mb-6 bg-success-green/20 border-success-green/40 backdrop-blur-sm">
      <CheckCircle className="h-4 w-4 success-green" />
      <AlertDescription className="success-green font-space-grotesk text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4" />
          <span>✅ Conta criada! Verifique seu email para confirmar o cadastro.</span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
