
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, BookOpen, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const scrollToSupremeChallenge = () => {
    // Scroll to the pricing section where the Supreme Challenge card is located
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <Sparkles className="absolute top-20 right-20 w-6 h-6 text-blue-300 opacity-30 animate-pulse delay-500" />
        <Trophy className="absolute bottom-20 left-20 w-5 h-5 text-purple-400 opacity-30 animate-bounce delay-700" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 py-[16px]">
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            #1 Plataforma Gamificada para Revalida no Brasil
          </Badge>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-inherit text-4xl">
              O Banco de Questões Oficiais do
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent text-4xl">Revalida INEP</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A única plataforma que transforma sua preparação para o Revalida em uma 
            jornada gamificada com mais de 1.500 questões oficiais, missões exclusivas 
            e análises com IA.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Começar Grátis Agora
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToSupremeChallenge}
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black border-0 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 blur-md opacity-60 animate-pulse"></div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-900" />
                <span className="bg-gradient-to-r from-yellow-900 to-orange-800 bg-clip-text text-transparent font-extrabold">
                  Desafio Surpresa
                </span>
                <Sparkles className="w-5 h-5 ml-2 text-yellow-900 animate-spin" />
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] animate-[shine_2s_infinite]"></div>
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

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>;
}
```

Agora vou adicionar o CSS personalizado para a animação shine no arquivo de animações:

<lov-write file_path="src/styles/animations.css">
@layer utilities {
  /* Enhanced Fade Animations */
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
  }

  /* Enhanced Scale Animations */
  @keyframes scale-in {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scale-out {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }

  /* Slide Animations */
  @keyframes slide-in-right {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out-right {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* New Drawer Animations */
  @keyframes slide-in-down {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out-up {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  /* XP Pill Flight Animation */
  @keyframes xp-flight {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    25% {
      transform: translate(calc(var(--delta-x) * 0.3), calc(var(--delta-y) * 0.1)) scale(1.2);
      opacity: 1;
    }
    75% {
      transform: translate(calc(var(--delta-x) * 0.8), calc(var(--delta-y) * 0.8)) scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: translate(var(--delta-x), var(--delta-y)) scale(0.8);
      opacity: 0;
    }
  }

  /* Bounce Enhanced */
  @keyframes bounce-enhanced {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -15px, 0);
    }
    70% {
      transform: translate3d(0, -8px, 0);
    }
    90% {
      transform: translate3d(0, -3px, 0);
    }
  }

  /* Pulse Enhanced */
  @keyframes pulse-enhanced {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }

  /* Wobble Animation */
  @keyframes wobble {
    0% { transform: translateX(0%); }
    15% { transform: translateX(-25px) rotate(-5deg); }
    30% { transform: translateX(20px) rotate(3deg); }
    45% { transform: translateX(-15px) rotate(-3deg); }
    60% { transform: translateX(10px) rotate(2deg); }
    75% { transform: translateX(-5px) rotate(-1deg); }
    100% { transform: translateX(0%); }
  }

  /* Stagger Animation */
  @keyframes stagger-in {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Glow Animation */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
    }
  }

  /* Shine Animation for Golden Button */
  @keyframes shine {
    0% {
      transform: translateX(-100%) skewX(-12deg);
    }
    100% {
      transform: translateX(200%) skewX(-12deg);
    }
  }

  /* Animation Classes */
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-fade-out {
    animation: fade-out 0.4s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.4s ease-out forwards;
  }

  .animate-scale-out {
    animation: scale-out 0.3s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out forwards;
  }

  .animate-slide-out-right {
    animation: slide-out-right 0.4s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.5s ease-out forwards;
  }

  .animate-slide-in-down {
    animation: slide-in-down 0.3s ease-out forwards;
  }

  .animate-slide-out-up {
    animation: slide-out-up 0.3s ease-out forwards;
  }

  .animate-xp-flight {
    animation: xp-flight 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-bounce-enhanced {
    animation: bounce-enhanced 1s infinite;
  }

  .animate-pulse-enhanced {
    animation: pulse-enhanced 2s infinite;
  }

  .animate-wobble {
    animation: wobble 1s ease-in-out;
  }

  .animate-stagger-in {
    animation: stagger-in 0.6s ease-out forwards;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-shine {
    animation: shine 2s infinite;
  }

  /* Hover Effects */
  .hover-scale {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  .hover-scale-102 {
    transition: transform 0.2s ease;
  }

  .hover-scale-102:hover {
    transform: scale(1.02);
  }

  /* Responsive Animations */
  @media (max-width: 640px) {
    .animate-fade-in {
      animation-duration: 0.4s;
    }
    
    .hover-scale:hover {
      transform: scale(1.02);
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    .animate-scale-in,
    .animate-slide-in-right,
    .animate-slide-in-left,
    .animate-slide-in-down,
    .animate-slide-out-up,
    .animate-bounce-enhanced,
    .animate-pulse-enhanced,
    .animate-wobble,
    .animate-stagger-in,
    .animate-glow,
    .animate-xp-flight,
    .animate-shine {
      animation: none;
    }
    
    .hover-scale:hover {
      transform: none;
    }
  }
}
```
