
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { 
  Stethoscope, 
  UserPlus, 
  LogIn, 
  Star,
  Crown,
  Zap,
  CheckCircle,
  AlertCircle,
  Mail
} from 'lucide-react';

export function AuthForm() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      if (signInError.message === "Invalid login credentials") {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      } else if (signInError.message.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
      } else {
        setError('Erro no login. Tente novamente em alguns instantes.');
      }
    }
    
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signUpError } = await signUp(email, password, displayName);
    
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (signUpError.message.includes('Password should be')) {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Erro no cadastro. Tente novamente em alguns instantes.');
      }
    } else {
      setShowSuccess(true);
      setEmail('');
      setPassword('');
      setDisplayName('');
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setError('');
    setShowSuccess(false);
  };

  return (
    <div className="relative">
      {/* Glassmorphism card with neon border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
      
      <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
        
        <CardHeader className="text-center pb-2 pt-8 relative z-10">
          <div className="relative mx-auto mb-6 lg:hidden">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-110">
                <Stethoscope className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div className="ml-3">
                <h2 className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Revalida Quest
                </h2>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/50 animate-pulse">
              <Crown className="w-2.5 h-2.5 text-yellow-900" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Bem-vindo ao Revalida Quest
          </CardTitle>
          <CardDescription className="text-base mt-2 text-purple-200/80 font-space-grotesk">
            Sua jornada médica oficial começa aqui! 🚀
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 relative z-10">
          {/* Success Message */}
          {showSuccess && (
            <Alert className="mb-6 bg-green-500/10 border-green-400/30 backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Conta criada! Verifique seu email para confirmar o cadastro.</span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-400/30 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full" onValueChange={resetForm}>
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
              <form onSubmit={handleSignIn} className="space-y-6">
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
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-6 mt-6">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium text-purple-200 font-space-grotesk">Nome</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={isSubmitting || loading}
                    className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-purple-300/70 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 hover:bg-white/15 font-space-grotesk"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-sm font-medium text-purple-200 font-space-grotesk">
                    Email <span className="text-pink-400">*</span>
                  </Label>
                  <Input
                    id="signupEmail"
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
                  <Label htmlFor="signupPassword" className="text-sm font-medium text-purple-200 font-space-grotesk">
                    Senha <span className="text-pink-400">*</span>
                  </Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting || loading}
                    minLength={6}
                    className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-purple-300/70 focus:border-purple-400 focus:ring-purple-400/30 transition-all duration-300 hover:bg-white/15 font-space-grotesk"
                  />
                  <p className="text-xs text-purple-300/70 mt-1 font-space-grotesk">Mínimo de 6 caracteres</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 hover:from-purple-800 hover:via-pink-700 hover:to-blue-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden"
                  disabled={isSubmitting || loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Criando conta...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <Star className="w-5 h-5" />
                      Criar Conta ⭐
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-purple-200/70 font-space-grotesk">
              Problemas para acessar? Verifique seu email ou entre em contato conosco.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
