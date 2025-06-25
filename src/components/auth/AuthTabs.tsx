
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthTabsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
  handleSignUp: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  loading: boolean;
  onValueChange: () => void;
}

export function AuthTabs({
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  handleSignIn,
  handleSignUp,
  isSubmitting,
  loading,
  onValueChange
}: AuthTabsProps) {
  return (
    <Tabs defaultValue="login" className="w-full" onValueChange={onValueChange}>
      <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/10">
        <TabsTrigger 
          value="login" 
          className="flex items-center gap-2 rounded-lg font-space-grotesk data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-white/10"
        >
          <LogIn className="w-4 h-4" />
          Entrar
        </TabsTrigger>
        <TabsTrigger 
          value="signup" 
          className="flex items-center gap-2 rounded-lg font-space-grotesk data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-white/10"
        >
          <UserPlus className="w-4 h-4" />
          Cadastrar
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-6 mt-6">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignIn}
          isSubmitting={isSubmitting}
          loading={loading}
        />
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-6 mt-6">
        <SignupForm
          displayName={displayName}
          setDisplayName={setDisplayName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignUp}
          isSubmitting={isSubmitting}
          loading={loading}
        />
      </TabsContent>
    </Tabs>
  );
}
