
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UserProfile } from '@/components/UserProfile';
import { BadgeUnlockedNotification } from '@/components/BadgeUnlockedNotification';
import { useGamification } from '@/hooks/useGamification';

export default function Profile() {
  const { getNewlyUnlockedBadge, clearNewlyUnlockedBadge } = useGamification();
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  
  // Check for newly unlocked badges
  const newlyUnlockedBadge = getNewlyUnlockedBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-bounce delay-1000"></div>
      </div>

      <Navbar />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Meu Perfil</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Acompanhe sua jornada épica rumo à aprovação no Revalida! 🚀
            </p>
          </div>
          
          {/* Main Profile Card */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-blue-200/50 dark:border-blue-700/50">
            <UserProfile />
          </div>
        </div>
      </div>
      
      {/* Badge Unlock Notification */}
      <BadgeUnlockedNotification
        achievement={newlyUnlockedBadge}
        onClose={clearNewlyUnlockedBadge}
      />
    </div>
  );
}
