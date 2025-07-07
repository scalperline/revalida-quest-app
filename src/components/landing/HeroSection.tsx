
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, BookOpen, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <Sparkles className="absolute top-20 right-20 w-6 h-6 text-blue-300 opacity-30 animate-pulse delay-500" />
        <Trophy className="absolute bottom-20 left-20 w-5 h-5 text-purple-400 opacity-30 animate-bounce delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            #1 Plataforma Gamificada para Revalida no Brasil
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Domine o{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Revalida
            </span>{" "}
            com{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Gamificação
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A única plataforma que transforma sua preparação para o Revalida em uma 
            jornada gamificada com mais de 1.500 questões oficiais, missões exclusivas 
            e análises com IA.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Começar Grátis Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
              <Play className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>+11.200 médicos ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 estrelas (2.400+ avaliações)</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>87% de aprovação</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl border-4 border-white overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-blue-600 mx-auto mb-4 opacity-70" />
                <p className="text-blue-700 font-semibold">Demonstração do Produto</p>
              </div>
            </div>
          </div>
          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-bounce">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Missão Completa!</p>
                <p className="text-xs text-gray-500">+50 XP</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600 fill-current" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Nível 15</p>
                <p className="text-xs text-gray-500">Especialista</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
