
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3 mx-[3px] px-0 my-0 py-0 rounded-lg">
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-0 my-0 py-0 px-0" />
            </div>
            {/* Responsive logo text */}
            <div className="flex flex-col min-w-0">
              <span className="sm:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse whitespace-nowrap text-lg">
                RevalidaQuest
              </span>
              <span className="text-xs text-gray-500 -mt-0.5 whitespace-nowrap hidden xs:block">
                Sua jornada médica
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Depoimentos</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Preços</a>
            <Link to="/auth" className="text-gray-700 hover:text-blue-600 transition-colors">Entrar</Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Começar Grátis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-200">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Depoimentos</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Preços</a>
              <Link to="/auth" className="text-gray-700 hover:text-blue-600 transition-colors">Entrar</Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-full">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
