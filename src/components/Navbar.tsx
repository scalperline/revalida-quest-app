
import { useAuth } from "@/hooks/useAuth";
import { useGamification } from "@/hooks/useGamification";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { MobileHamburgerButton } from "@/components/MobileHamburgerButton";
import { MobileHamburgerMenu } from "@/components/MobileHamburgerMenu";
import { MobileUserProgress } from "@/components/MobileUserProgress";
import { UserProgressBar } from "@/components/UserProgressBar";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { useSubscription } from "@/hooks/useSubscription";
import { useMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { BookOpen, Target, BarChart3, User, Trophy, Flag, Play } from "lucide-react";

export function Navbar() {
  const { user } = useAuth();
  const { userProgress } = useGamification();
  const { subscription } = useSubscription();
  const isMobile = useMobile();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { to: "/questoes", label: "Questões", icon: BookOpen },
    { to: "/simulado", label: "Simulado", icon: Play },
    { to: "/missoes", label: "Missões", icon: Flag },
    { to: "/stats", label: "Estatísticas", icon: BarChart3 },
    { to: "/ranking", label: "Ranking", icon: Trophy },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span className="text-2xl sm:text-3xl">🎯</span>
                <span className="hidden xs:block">RevalidaQuest</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`
                    }
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Subscription Badge - Desktop */}
              <div className="hidden sm:block">
                <SubscriptionBadge subscription={subscription} />
              </div>

              {/* Progress Bar - Desktop/Tablet */}
              <div className="hidden sm:block">
                <UserProgressBar 
                  level={userProgress.level}
                  xp={userProgress.xp}
                  xpToNextLevel={userProgress.xpToNextLevel}
                  showCompact={true}
                />
              </div>

              {/* Profile Button - Desktop */}
              <div className="hidden lg:block">
                <NavLink to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">
                      {user.user_metadata?.display_name || 'Perfil'}
                    </span>
                  </Button>
                </NavLink>
              </div>

              {/* Logout - Desktop */}
              <div className="hidden lg:block">
                <LogoutButton />
              </div>

              {/* Mobile Hamburger */}
              <div className="lg:hidden">
                <MobileHamburgerButton 
                  isOpen={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="sm:hidden pb-2">
            <MobileUserProgress userProgress={userProgress} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileHamburgerMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
