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
  Users
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Section - Gamified */}
          <div className="hidden lg:block space-y-10">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Revalida Quest</h2>
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Revalida Quest
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Transforme sua preparação para o Revalida em uma <span className="font-semibold text-blue-600">aventura épica</span> e gamificada! 
                Desbloqueie seu potencial médico através de uma jornada interativa.
              </p>
              
              {/* XP Preview */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Ganhe XP a cada questão!</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full w-3/4 relative">
                    <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Nível 5</span>
                  <span>750/1000 XP</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="group flex items-center gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Sistema de Níveis e XP</h3>
                  <p className="text-gray-600 dark:text-gray-400">Ganhe experiência, suba de nível e desbloqueie conquistas</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Conquistas e Badges</h3>
                  <p className="text-gray-600 dark:text-gray-400">Desbloqueie medalhas especiais e mostre suas habilidades</p>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <Target className="w-4 h-4 text-pink-400" />
                  <Crown className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">Ranking Competitivo</h3>
                  <p className="text-gray-600 dark:text-gray-400">Compare seu progresso e compita com outros médicos</p>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <Heart className="w-4 h-4 text-red-400" />
                  <BookOpen className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Junte-se a milhares de médicos!</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usuários Ativos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">500k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questões Respondidas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Aprovação</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Form - Enhanced */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                <div className="bg-white dark:bg-gray-800 rounded-3xl">
                  <CardHeader className="text-center pb-2 pt-8">
                    <div className="relative mx-auto mb-6 lg:hidden flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <Stethoscope className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Crown className="w-2.5 h-2.5 text-yellow-800" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Revalida Quest</h3>
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Bem-vindo ao Revalida Quest
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Sua jornada épica para conquistar o Revalida começa aqui! ⚔️
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
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
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                            <Label htmlFor="displayName" className="text-sm font-medium">Nome de Aventureiro</Label>
                            <Input
                              id="displayName"
                              type="text"
                              placeholder="Como você quer ser chamado na Quest?"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              disabled={isSubmitting}
                              className="h-12 rounded-xl border-2 focus:border-green-500 transition-colors"
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
                              className="h-12 rounded-xl border-2 focus:border-green-500 transition-colors"
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
                              className="h-12 rounded-xl border-2 focus:border-green-500 transition-colors"
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                                Criar Conta de Aventureiro
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

            {/* Mobile Hero Elements */}
            <div className="lg:hidden mt-8 space-y-4">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 text-center">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">Junte-se a milhares de médicos!</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">12k+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Usuários</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">500k+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Questões</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Aprovação</div>
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
