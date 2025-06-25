
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
      {/* Enhanced Galactic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main constellation stars */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/60 rounded-full animate-pulse shadow-lg shadow-white/30"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-200/70 rounded-full animate-pulse delay-300 shadow-md shadow-blue-200/40"></div>
        <div className="absolute top-60 left-1/4 w-2.5 h-2.5 bg-white/50 rounded-full animate-pulse delay-700 shadow-lg shadow-white/30"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-indigo-200/60 rounded-full animate-pulse delay-1000 shadow-md shadow-indigo-200/40"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-500 shadow-lg shadow-white/25"></div>
        
        {/* Enhanced constellation patterns */}
        <div className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-36 right-1/3 translate-x-4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-pulse delay-400"></div>
        <div className="absolute top-44 right-1/3 translate-x-2 w-1.5 h-1.5 bg-white/55 rounded-full animate-pulse delay-600"></div>
        
        {/* Galactic nebula effects - enhanced */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-400/12 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/5 w-28 h-28 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
        {/* Distant star clusters */}
        <div className="absolute top-1/6 right-1/5 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-blue-200/40 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-400"></div>
        
        {/* Floating cosmic particles */}
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/2 left-1/5 w-1.5 h-1.5 bg-blue-200/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 right-2/5 w-1 h-1 bg-white/20 rounded-full animate-bounce delay-1100"></div>
        
        {/* Galactic dust trails */}
        <div className="absolute top-1/5 left-2/3 w-16 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 blur-sm animate-pulse delay-600"></div>
        <div className="absolute bottom-1/3 left-1/6 w-12 h-1 bg-gradient-to-r from-transparent via-blue-200/8 to-transparent rotate-12 blur-sm animate-pulse delay-900"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
          
          {/* Hero Section - Desktop 60% */}
          <AuthHeroSection />

          {/* Auth Form - Desktop 40% */}
          <div className="w-full">
            <AuthForm />
          </div>
        </div>
      </div>

      {/* Mobile Official Cards - Only shown on mobile, positioned after the form */}
      <div className="lg:hidden relative z-10 pb-8">
        <MobileOfficialCards />
      </div>
    </div>
  );
}
