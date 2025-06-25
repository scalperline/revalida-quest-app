
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope } from 'lucide-react';
import { AuthHeroSection } from '@/components/auth/AuthHeroSection';
import { AuthForm } from '@/components/auth/AuthForm';
import { MobileOfficialCards } from '@/components/auth/MobileOfficialCards';
import { StarField } from '@/components/auth/StarField';
import { ParticleField } from '@/components/auth/ParticleField';
import { GamifiedCards } from '@/components/auth/GamifiedCards';

export default function Auth() {
  const { user, loading } = useAuth();

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        <StarField />
        <ParticleField />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 shadow-lg shadow-purple-400/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-purple-400 animate-pulse drop-shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated stellar background */}
      <StarField />
      <ParticleField />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Gamified cards and hero */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold font-space-grotesk text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text mb-4 drop-shadow-2xl">
                Revalida Quest
              </h1>
              <p className="text-xl text-purple-200/90 font-space-grotesk font-light mb-8">
                Sua jornada intergaláctica médica começa aqui 🚀
              </p>
            </div>
            
            {/* Desktop gamified cards */}
            <div className="hidden lg:block">
              <GamifiedCards />
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="w-full max-w-md mx-auto">
            <AuthForm />
            <MobileOfficialCards />
          </div>
        </div>
      </div>
    </div>
  );
}
