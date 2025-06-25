
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthErrorAlertProps {
  error: string;
}

export function AuthErrorAlert({ error }: AuthErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert className="mb-6 bg-red-500/20 border-red-400/40 backdrop-blur-sm">
      <AlertTriangle className="h-4 w-4 text-red-300" />
      <AlertDescription className="text-red-100 font-space-grotesk text-sm sm:text-base">
        {error}
      </AlertDescription>
    </Alert>
  );
}
