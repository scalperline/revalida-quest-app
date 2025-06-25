
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus, ArrowRight, Sparkles } from 'lucide-react';
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
      {/* Custom button layout without TabsList */}
      <div className="w-full mb-6">
        {/* Mobile: botões verticais */}
        <div className="flex flex-col gap-4 sm:hidden">
          <TabsTrigger 
            value="login" 
            className="w-full flex items-center justify-center gap-2 h-14 rounded-xl font-space-grotesk bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-base"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar</span>
            <ArrowRight className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="w-full flex items-center justify-center gap-2 h-14 rounded-xl font-space-grotesk bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-blue-100 border-2 border-white/50 hover:border-white transition-all duration-300 hover:scale-105 font-semibold text-base"
          >
            <Sparkles className="w-5 h-5" />
            <span>Cadastrar</span>
            <UserPlus className="w-4 h-4" />
          </TabsTrigger>
        </div>

        {/* Desktop: botões lado a lado */}
        <div className="hidden sm:flex gap-3">
          <TabsTrigger 
            value="login" 
            className="flex-1 max-w-[55%] flex items-center justify-center gap-2 h-14 rounded-xl font-space-grotesk bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-base"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar</span>
            <ArrowRight className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="flex-1 max-w-[45%] flex items-center justify-center gap-2 h-14 rounded-xl font-space-grotesk bg-transparent hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-blue-100 border-2 border-white/50 hover:border-white transition-all duration-300 hover:scale-105 font-semibold text-base"
          >
            <Sparkles className="w-5 h-5" />
            <span>Cadastrar</span>
            <UserPlus className="w-4 h-4" />
          </TabsTrigger>
        </div>
      </div>
      
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
