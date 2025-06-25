
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  loading: boolean;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isSubmitting,
  loading
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm sm:text-base font-medium text-white font-space-grotesk">
          📧 Email <span className="text-orange-400">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || loading}
            className="h-12 sm:h-14 pl-12 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg focus-visible:ring-2 focus-visible:ring-orange-400/50"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm sm:text-base font-medium text-white font-space-grotesk">
          🔒 Senha <span className="text-orange-400">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting || loading}
            className="h-12 sm:h-14 pl-12 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg focus-visible:ring-2 focus-visible:ring-orange-400/50"
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-14 sm:h-16 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden"
        disabled={isSubmitting || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Entrando...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 relative z-10">
            <Heart className="w-5 h-5 animate-pulse" />
            <span className="text-sm sm:text-base">Iniciar Jornada Médica</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        )}
      </Button>
    </form>
  );
}
