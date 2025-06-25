
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
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-1">
        <div className="bg-white dark:bg-gray-800 rounded-3xl">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="relative mx-auto mb-6 lg:hidden">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="ml-3">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Revalida Quest
                  </h2>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-yellow-800" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Bem-vindo ao Revalida Quest
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sua jornada médica oficial começa aqui! 🏥
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Success Message */}
            {showSuccess && (
              <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Conta criada! Verifique seu email para confirmar o cadastro.</span>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full" onValueChange={resetForm}>
              <TabsList className="grid w-full grid-cols-2 bg-blue-50 dark:bg-gray-700 rounded-xl p-1">
                <TabsTrigger 
                  value="login" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Cadastrar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting || loading}
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Senha <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting || loading}
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Entrando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Iniciar Jornada
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 mt-6">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium">Nome</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      disabled={isSubmitting || loading}
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting || loading}
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword" className="text-sm font-medium">
                      Senha <span className="text-red-500">*</span>
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
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Criando conta...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Criar Conta
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Problemas para acessar? Verifique seu email ou entre em contato conosco.
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
