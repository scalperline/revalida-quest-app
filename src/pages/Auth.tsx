
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { 
  Stethoscope, 
  UserPlus, 
  LogIn, 
  Trophy, 
  Star, 
  Zap, 
  Shield, 
  Target,
  Award,
  Crown,
  Sparkles,
  Heart,
  BookOpen,
  Users,
  CheckCircle,
  FileText,
  GraduationCap,
  BadgeCheck
} from 'lucide-react';

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    await signIn(email, password);
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    await signUp(email, password, displayName);
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Section - Blue Theme */}
          <div className="hidden lg:block space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Revalida Quest
                  </h1>
                </div>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Prepare-se para o <span className="font-semibold text-blue-700">Revalida</span> com questões oficiais e uma experiência gamificada única! 
                Sua jornada médica começa aqui.
              </p>
            </div>

            {/* Official Authority Cards */}
            <div className="grid gap-4 mb-8">
              <div className="group flex items-center gap-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-102 border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <BadgeCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Questões Oficiais do Revalida</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Banco completo com todas as provas aplicadas pelo INEP</p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500 fill-current" />
                  <span className="text-xs text-green-600 font-semibold">Verificado</span>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-102 border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Provas de 2011 a 2025</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Mais de 1.500 questões oficiais organizadas por ano</p>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-600 font-semibold">Completo</span>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-102 border border-blue-200 dark:border-blue-800">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Aprovado pelo MEC</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Conteúdo alinhado com as diretrizes oficiais do exame</p>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <Award className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>

            {/* Gamification Features */}
            <div className="grid gap-4">
              <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-2xl backdrop-blur-sm hover:from-blue-600/20 hover:to-blue-800/20 transition-all duration-300 hover:scale-102 border border-blue-300 dark:border-blue-700">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Sistema de Níveis e XP</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Ganhe experiência a cada questão respondida</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>

              <div className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-600/10 to-blue-800/10 rounded-2xl backdrop-blur-sm hover:from-blue-600/20 hover:to-blue-800/20 transition-all duration-300 hover:scale-102 border border-blue-300 dark:border-blue-700">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Ranking Nacional</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Compare seu desempenho com outros médicos</p>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="bg-gradient-to-r from-blue-600/15 to-blue-800/15 rounded-2xl p-6 border border-blue-300 dark:border-blue-700">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Junte-se a milhares de médicos!</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-700">12k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-800">500k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questões Respondidas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Aprovação</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Form - Blue Theme */}
          <div className="w-full max-w-md mx-auto">
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
                    <Tabs defaultValue="login" className="w-full">
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
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu.email@exemplo.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={isSubmitting}
                              className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              disabled={isSubmitting}
                              className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
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
                              disabled={isSubmitting}
                              className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signupEmail" className="text-sm font-medium">Email</Label>
                            <Input
                              id="signupEmail"
                              type="email"
                              placeholder="seu.email@exemplo.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={isSubmitting}
                              className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signupPassword" className="text-sm font-medium">Senha</Label>
                            <Input
                              id="signupPassword"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              disabled={isSubmitting}
                              minLength={6}
                              className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
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
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Mobile Official Cards */}
            <div className="lg:hidden mt-8 space-y-4">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck className="w-6 h-6 text-blue-600" />
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Questões Oficiais</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Banco completo com todas as provas do Revalida aplicadas pelo INEP de 2011 a 2025</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-700">1.500+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-800">15</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Anos</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Oficial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
