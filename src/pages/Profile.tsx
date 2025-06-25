
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center leading-tight tracking-tight">
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Meu Perfil</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe sua jornada épica rumo à aprovação no Revalida! 🚀
            </p>
          </div>
          
          {/* Main Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700">
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
