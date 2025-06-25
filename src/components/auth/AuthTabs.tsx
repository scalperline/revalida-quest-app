
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthTabsProps {
  email: string;
  password: string;
  displayName: string;
  isSubmitting: boolean;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onSignIn: (e: React.FormEvent) => void;
  onSignUp: (e: React.FormEvent) => void;
  onResetForm: () => void;
}

export function AuthTabs({
  email,
  password,
  displayName,
  isSubmitting,
  loading,
  onEmailChange,
  onPasswordChange,
  onDisplayNameChange,
  onSignIn,
  onSignUp,
  onResetForm
}: AuthTabsProps) {
  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={onResetForm}>
      <TabsList className="grid w-full grid-cols-2 bg-gray-50 rounded-xl p-1 mb-6">
        <TabsTrigger 
          value="login" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
        >
          <LogIn className="w-4 h-4" />
          Entrar
        </TabsTrigger>
        <TabsTrigger 
          value="signup" 
          className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Cadastrar
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-6">
        <LoginForm
          email={email}
          password={password}
          isSubmitting={isSubmitting}
          loading={loading}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onSubmit={onSignIn}
        />
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-6">
        <SignupForm
          email={email}
          password={password}
          displayName={displayName}
          isSubmitting={isSubmitting}
          loading={loading}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onDisplayNameChange={onDisplayNameChange}
          onSubmit={onSignUp}
        />
      </TabsContent>
    </Tabs>
  );
}
