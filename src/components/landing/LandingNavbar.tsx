
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
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              RevalidaQuest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#features">Recursos</a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#testimonials">Depoimentos</a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#pricing">Preços</a>
              </Button>
            </nav>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 pl-4 border-l border-blue-200">
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <Link to="/auth">Entrar</Link>
              </Button>
              <Button 
                size="sm"
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Link to="/auth">Começar Grátis</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#features">Recursos</a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#testimonials">Depoimentos</a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
              >
                <a href="#pricing">Preços</a>
              </Button>
              
              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-blue-100">
                <Button 
                  variant="ghost" 
                  size="sm"
                  asChild
                  className="justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200"
                >
                  <Link to="/auth">Entrar</Link>
                </Button>
                <Button 
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link to="/auth">Começar Grátis</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
