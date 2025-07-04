import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  return <>
      {/* Backdrop when expanded */}
      {isExpanded && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={toggleDrawer} />}
      
      {/* Drawer Container */}
      <div className="fixed top-14 left-0 right-0 z-50 md:hidden">
        {/* Collapsed State - Arrow Button */}
        {!isExpanded && <div className="flex justify-center">
            <button onClick={toggleDrawer} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-b-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 px-[16px] py-0 text-sm">
              
              <ChevronDown className="w-3 h-3 rounded" />
            </button>
          </div>}

        {/* Expanded State - Full Drawer */}
        {isExpanded && <div className={`bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-xl ${animationClass}`}>
            {/* Header with Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Seu Progresso
              </h3>
              <button onClick={toggleDrawer} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Progress Content */}
            <div className="p-4">
              <ProgressBalance />
            </div>
          </div>}
      </div>
    </>;
}