
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { BookOpen, BarChart3, User, Trophy, Flag, Play, X } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navItems = [
    { to: "/questoes", label: "Questões", icon: BookOpen },
    { to: "/simulado", label: "Simulado", icon: Play },
    { to: "/missoes", label: "Missões", icon: Flag },
    { to: "/stats", label: "Estatísticas", icon: BarChart3 },
    { to: "/ranking", label: "Ranking", icon: Trophy },
    { to: "/profile", label: "Perfil", icon: User }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-xl font-bold text-blue-600">
              🎯 RevalidaQuest
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6">
            <div className="space-y-2 px-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`
                    }
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}
