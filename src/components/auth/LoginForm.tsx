
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';

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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-purple-200 font-space-grotesk">
          Email <span className="text-pink-400">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-purple-300/70 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 hover:bg-white/15 font-space-grotesk"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-purple-200 font-space-grotesk">
          Senha <span className="text-pink-400">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-purple-300/70 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 hover:bg-white/15 font-space-grotesk"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full h-14 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden"
        disabled={isSubmitting || loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Entrando...
          </div>
        ) : (
          <div className="flex items-center gap-2 relative z-10">
            <Zap className="w-5 h-5" />
            Iniciar Jornada 🚀
          </div>
        )}
      </Button>
    </form>
  );
}
