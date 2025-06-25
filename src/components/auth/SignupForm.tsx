
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';

interface SignupFormProps {
  email: string;
  password: string;
  displayName: string;
  isSubmitting: boolean;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupForm({
  email,
  password,
  displayName,
  isSubmitting,
  loading,
  onEmailChange,
  onPasswordChange,
  onDisplayNameChange,
  onSubmit
}: SignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">Nome</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="Seu nome completo"
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          disabled={isSubmitting || loading}
          className="medical-input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupEmail" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="signupEmail"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isSubmitting || loading}
          className="medical-input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupPassword" className="text-sm font-medium text-gray-700">
          Senha <span className="text-red-500">*</span>
        </Label>
        <Input
          id="signupPassword"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          disabled={isSubmitting || loading}
          minLength={6}
          className="medical-input"
        />
        <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
      </div>
      <Button 
        type="submit" 
        className="w-full medical-button-primary"
        disabled={isSubmitting || loading}
      >
        {isSubmitting || loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Criando conta...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>📋</span>
            Cadastrar Nova Conta
          </div>
        )}
      </Button>
    </form>
  );
}
