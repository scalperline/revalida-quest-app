
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center relative overflow-hidden">
        <StarField />
        <ParticleField />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 shadow-lg shadow-blue-400/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-blue-400 animate-pulse drop-shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Medical background elements */}
      <StarField />
      <ParticleField />
      
      {/* Medical gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Medical cards and hero */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold font-space-grotesk text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text mb-4 drop-shadow-2xl">
                Revalida Quest
              </h1>
              <p className="text-xl text-blue-200/90 font-space-grotesk font-light mb-8">
                Sua jornada médica oficial começa aqui 🏥
              </p>
            </div>
            
            {/* Desktop medical cards */}
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
