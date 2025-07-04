
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GamifiedProgressBalance } from './GamifiedProgressBalance';

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

  // Auto-expand when XP is received for better visual feedback
  useEffect(() => {
    if (onXPReceived && !isExpanded) {
      setIsExpanded(true);
      setAnimationClass('animate-slide-in-down');
      setTimeout(() => setAnimationClass(''), 300);

      // Auto-collapse after 3 seconds
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

  return (
    <>
      {/* Backdrop when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={toggleDrawer} 
        />
      )}
      
      {/* Drawer Container */}
      <div className="fixed top-14 right-0 z-50 md:hidden">
        {/* Collapsed State - Elegant Arrow Button */}
        {!isExpanded && (
          <div className="flex justify-end pr-3">
            <button 
              onClick={toggleDrawer} 
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 text-white rounded-b-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-t-0 backdrop-blur-sm"
            >
              <span className="hidden xs:inline">Progresso</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Expanded State - Sophisticated Full Drawer */}
        {isExpanded && (
          <div className={`bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-2xl w-screen ${animationClass}`}>
            {/* Elegant Header with Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                🎯 Seu Progresso
              </h3>
              <button 
                onClick={toggleDrawer} 
                className="p-2 rounded-full hover:bg-white/50 transition-colors backdrop-blur-sm"
              >
                <ChevronUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Enhanced Progress Content */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <GamifiedProgressBalance />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
