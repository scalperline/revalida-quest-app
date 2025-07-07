
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Recursos', href: '#features' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Preços', href: '#pricing' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo - Responsive and always visible */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2 group transition-all duration-300 hover:scale-105 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3 mx-[3px] px-0 my-0 py-0 rounded-lg">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-0 my-0 py-0 px-0" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="sm:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight group-hover:animate-pulse whitespace-nowrap text-lg">
                  RevalidaQuest
                </span>
                <span className="text-xs text-gray-500 -mt-0.5 whitespace-nowrap hidden xs:block">
                  Sua jornada médica
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Full with text (md+) */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-4">
            <div className="flex items-center bg-gray-50/90 backdrop-blur-sm rounded-2xl px-1 py-1 border-2 border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {navigation.map(item => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap group text-gray-700 hover:bg-white/90 hover:text-blue-600 hover:shadow-md hover:scale-[1.02]"
                >
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1.5 shadow-lg border border-gray-200 flex items-center gap-2">
              <Link to="/auth" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50">
                Entrar
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 text-sm font-medium">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="relative p-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-gray-700 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm md:hidden" 
              onClick={() => setIsMenuOpen(false)}
              style={{ touchAction: 'none' }}
            />
            
            {/* Mobile Menu Content */}
            <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-xl z-50 md:hidden">
              <div className="px-4 py-6 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigation.map(item => (
                    <a 
                      key={item.name}
                      href={item.href} 
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                
                {/* Auth Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link 
                    to="/auth" 
                    className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-base font-medium">
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
