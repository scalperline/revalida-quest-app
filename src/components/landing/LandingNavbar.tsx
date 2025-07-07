
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              RevalidaQuest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 mr-8">
              <a 
                href="#testimonials" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Depoimentos
              </a>
              <a 
                href="#pricing" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Preços
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
                >
                  Entrar
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col gap-2">
              <a 
                href="#features" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Recursos
              </a>
              <a 
                href="#testimonials" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Depoimentos
              </a>
              <a 
                href="#pricing" 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Preços
              </a>
              <div className="pt-2 mt-2 border-t border-gray-200/50 space-y-2">
                <Link to="/auth" className="block">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    Começar Grátis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
