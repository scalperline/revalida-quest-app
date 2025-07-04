import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Trophy, Zap } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { ProgressBalance } from './ProgressBalance';
interface MobileProgressDrawerProps {
  isVisible?: boolean;
  onXPReceived?: () => void;
}
export function MobileProgressDrawer({
  isVisible = true,
  onXPReceived
}: MobileProgressDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const {
    userProgress
  } = useGamification();
  const toggleDrawer = () => {
    if (isExpanded) {
      setAnimationClass('animate-slide-out-up');
      setTimeout(() => {
        setIsExpanded(false);
        setAnimationClass('');
      }, 300);
    } else {
      setIsExpanded(true);
      setAnimationClass('animate-slide-in-down');
      setTimeout(() => setAnimationClass(''), 300);
    }
  };

  // Auto-expand quando XP é recebido para melhor feedback visual
  useEffect(() => {
    if (onXPReceived && !isExpanded) {
      setIsExpanded(true);
      setAnimationClass('animate-slide-in-down');
      setTimeout(() => setAnimationClass(''), 300);

      // Auto-colapsar após 3 segundos
      setTimeout(() => {
        if (isExpanded) {
          setAnimationClass('animate-slide-out-up');
          setTimeout(() => {
            setIsExpanded(false);
            setAnimationClass('');
          }, 300);
        }
      }, 3000);
    }
  }, [onXPReceived]);
  if (!isVisible) return null;
  return <>
      {/* Backdrop quando expandido */}
      {isExpanded && <div className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm" onClick={toggleDrawer} />}
      
      {/* Container do Drawer */}
      <div className="fixed top-14 right-0 z-50 md:hidden">
        {/* Estado Colapsado - Botão com Preview */}
        {!isExpanded && <div className="flex justify-end pr-3">
            <button onClick={toggleDrawer} className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-b-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-3 py-2 text-xs font-medium border-t-0 border-2 border-blue-300/30">
              {/* Mini Preview do Progresso */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  
                  
                </div>
                
                <div className="w-px h-3 bg-white/30"></div>
                
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-orange-300" />
                  <span className="text-xs font-medium">{userProgress.xp}</span>
                </div>
              </div>
              
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>
          </div>}

        {/* Estado Expandido - Drawer Completo */}
        {isExpanded && <div className={`bg-white/98 backdrop-blur-lg border-b-2 border-blue-200/50 shadow-2xl w-screen ${animationClass} border-l border-r border-gray-100`}>
            {/* Header Profissional */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100/80 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Progresso Gamificado
                </h3>
              </div>
              <button onClick={toggleDrawer} className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors group">
                <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>
            </div>

            {/* Conteúdo do Progresso Aprimorado */}
            <div className="p-5 bg-gradient-to-br from-gray-50/30 to-blue-50/20">
              <ProgressBalance />
              
              {/* Indicador de Atividade Adicional */}
              <div className="mt-4 pt-3 border-t border-gray-200/60">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Sistema Ativo
                  </span>
                  <span className="font-medium">
                    Próximo: {userProgress.xpToNextLevel - userProgress.xp} XP
                  </span>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </>;
}