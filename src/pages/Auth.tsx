
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope } from 'lucide-react';
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left side - Medical cards and hero */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left px-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text mb-4 drop-shadow-2xl leading-tight">
                Revalida Quest
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/95 font-space-grotesk font-light mb-6 lg:mb-8 leading-relaxed">
                Sua jornada médica oficial começa aqui 🏥
              </p>
            </div>
            
            {/* Desktop medical cards */}
            <div className="hidden lg:block">
              <GamifiedCards />
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="w-full order-1 lg:order-2">
            <AuthForm />
            <MobileOfficialCards />
          </div>
        </div>
      </div>
    </div>
  );
}
