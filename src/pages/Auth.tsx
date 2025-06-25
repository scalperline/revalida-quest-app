
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Stethoscope } from 'lucide-react';
import { AuthHeroSection } from '@/components/auth/AuthHeroSection';
import { AuthForm } from '@/components/auth/AuthForm';
import { MobileOfficialCards } from '@/components/auth/MobileOfficialCards';

export default function Auth() {
  const { user, loading } = useAuth();

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen stellar-gradient flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen stellar-gradient relative overflow-hidden">
      {/* Stellar Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-500"></div>
        
        {/* Constellation patterns */}
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-36 right-1/3 translate-x-4 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-44 right-1/3 translate-x-2 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-600"></div>
        
        {/* Subtle nebula effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/2 left-1/5 w-1 h-1 bg-white/15 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
          
          {/* Hero Section - Desktop 60% */}
          <AuthHeroSection />

          {/* Auth Form - Desktop 40% */}
          <div className="w-full">
            <AuthForm />
            <MobileOfficialCards />
          </div>
        </div>
      </div>
    </div>
  );
}
