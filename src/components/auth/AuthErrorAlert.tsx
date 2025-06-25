
import { Cross } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthErrorAlertProps {
  error: string;
}

export function AuthErrorAlert({ error }: AuthErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert className="mb-6 bg-red-500/10 border-red-400/30 backdrop-blur-sm">
      <Cross className="h-4 w-4 text-red-400" />
      <AlertDescription className="text-red-200">
        {error}
      </AlertDescription>
    </Alert>
  );
}
