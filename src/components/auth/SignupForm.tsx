
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User } from 'lucide-react';

interface SignupFormProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  loading: boolean;
  showSubmitButton?: boolean;
}

export function SignupForm({
  displayName,
  setDisplayName,
  email,
  setEmail,
  password,
  setPassword,
  isSubmitting,
  loading,
  showSubmitButton = true
}: SignupFormProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Nome (opcional)
        </Label>
        <div className="relative">
          <User className="input-icon" />
          <Input
            id="displayName"
            type="text"
            placeholder="Seu nome completo"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={isSubmitting || loading}
            className="input-with-icon h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Email <span className="text-red-300">*</span>
        </Label>
        <div className="relative">
          <Mail className="input-icon" />
          <Input
            id="signup-email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || loading}
            className="input-with-icon h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Senha <span className="text-red-300">*</span>
        </Label>
        <div className="relative">
          <Lock className="input-icon" />
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting || loading}
            className="input-with-icon h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
          />
        </div>
        <p className="text-xs sm:text-sm text-blue-200/80 font-space-grotesk">
          Mínimo de 6 caracteres
        </p>
      </div>
    </div>
  );
}
