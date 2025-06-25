
import { CheckCircle, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthSuccessAlertProps {
  show: boolean;
}

export function AuthSuccessAlert({ show }: AuthSuccessAlertProps) {
  if (!show) return null;

  return (
    <Alert className="mb-6 bg-green-500/10 border-green-400/30 backdrop-blur-sm">
      <CheckCircle className="h-4 w-4 text-green-400" />
      <AlertDescription className="text-green-200">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Conta criada! Verifique seu email para confirmar o cadastro.</span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
