
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

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
        <Label htmlFor="email" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Email <span className="text-red-300">*</span>
        </Label>
        <Input
          id="email"
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
        <Label htmlFor="password" className="text-sm sm:text-base font-medium text-blue-100 font-space-grotesk">
          Senha <span className="text-red-300">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-12 sm:h-14 rounded-xl border-2 border-blue-200/40 bg-blue-50/20 backdrop-blur-sm text-white placeholder:text-blue-200/70 focus:border-blue-300 focus:ring-blue-300/30 transition-all duration-300 hover:bg-blue-50/25 font-space-grotesk text-base sm:text-lg"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full h-14 sm:h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden"
        disabled={isSubmitting || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Entrando...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 relative z-10">
            <Heart className="w-5 h-5 animate-pulse" />
            <span className="text-sm sm:text-base">Iniciar Jornada Médica 🏥</span>
          </div>
        )}
      </Button>
    </form>
  );
}
