
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';

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
}

export function SignupForm({
  displayName,
  setDisplayName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isSubmitting,
  loading
}: SignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Nome (opcional)
        </Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Seu nome completo"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={isSubmitting || loading}
          className="h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-blue-300 focus:ring-blue-300/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Email <span className="text-red-300">*</span>
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-blue-300 focus:ring-blue-300/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Senha <span className="text-red-300">*</span>
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-blue-300 focus:ring-blue-300/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
        />
        <p className="text-xs sm:text-sm text-blue-200/80 font-space-grotesk">
          Mínimo de 6 caracteres
        </p>
      </div>
      <Button 
        type="submit" 
        className="w-full h-14 sm:h-16 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden"
        disabled={isSubmitting || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Cadastrando...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 relative z-10">
            <UserPlus className="w-5 h-5" />
            <span className="text-sm sm:text-base">Criar Conta Médica 👨‍⚕️</span>
          </div>
        )}
      </Button>
    </form>
  );
}
