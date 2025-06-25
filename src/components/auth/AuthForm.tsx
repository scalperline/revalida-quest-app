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
  Zap,
  CheckCircle,
  AlertCircle,
  Mail,
  TrendingUp
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
    <div className="w-full max-w-md mx-auto">
      <Card className="medical-card shadow-2xl border-0 overflow-hidden">
        <CardHeader className="text-center pb-6">
          {/* Logo Mobile */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center shadow-2xl">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div className="ml-3">
                <h2 className="text-2xl font-bold gradient-text">
                  Revalida Quest
                </h2>
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo ao Revalida Quest
          </CardTitle>
          <CardDescription className="text-base text-gray-600 flex items-center justify-center gap-2">
            Sua jornada médica oficial começa aqui <span className="text-lg">🩺</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
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
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                    className="medical-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                    className="medical-input"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full medical-button-primary"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>⚡</span>
                      Iniciar Jornada
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">Nome</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
            </TabsContent>
          </Tabs>

          {/* Rodapé com Estatísticas */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-blue-600">1.500+</div>
                <div className="text-gray-500 text-xs">Questões</div>
              </div>
              <div>
                <div className="font-bold text-green-600">95%</div>
                <div className="text-gray-500 text-xs">Aprovação</div>
              </div>
              <div>
                <div className="font-bold text-yellow-600">12k+</div>
                <div className="text-gray-500 text-xs">Médicos</div>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Problemas para acessar? Verifique seu email ou entre em contato conosco.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards - mantendo o componente existente */}
      <MobileOfficialCards />
    </div>
  );
}
