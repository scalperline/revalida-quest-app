
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthErrorAlertProps {
  error: string;
}

export function AuthErrorAlert({ error }: AuthErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert className="mb-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-400/60 backdrop-blur-sm shadow-lg shadow-red-500/25">
      <AlertTriangle className="h-4 w-4 text-orange-300" />
      <AlertDescription className="text-red-100 font-space-grotesk text-sm sm:text-base">
        {error}
      </AlertDescription>
    </Alert>
  );
}
