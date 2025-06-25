
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
      <TabsList className="grid w-full grid-cols-2 bg-blue-100/25 backdrop-blur-sm rounded-xl p-1 border border-blue-200/30 h-12 sm:h-auto">
        <TabsTrigger 
          value="login" 
          className="flex items-center gap-2 rounded-lg font-space-grotesk data-[state=active]:bg-blue-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-blue-400/20 text-blue-100 font-semibold text-sm sm:text-base py-2 sm:py-3"
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden xs:inline">Entrar</span>
        </TabsTrigger>
        <TabsTrigger 
          value="signup" 
          className="flex items-center gap-2 rounded-lg font-space-grotesk data-[state=active]:bg-blue-500/30 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-blue-400/20 text-blue-100 font-semibold text-sm sm:text-base py-2 sm:py-3"
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden xs:inline">Cadastrar</span>
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
